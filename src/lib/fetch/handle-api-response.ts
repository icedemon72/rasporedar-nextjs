import { notFound } from 'next/navigation';

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await safeJson(response);

    // notFound(); // Trigger 404 page

    // Optional: Handle unauthorized or log other errors
    console.error(`API Error (${response.status}):`, errorData?.message || response.statusText);

    throw new Error(errorData?.message || 'Server error');
  }

  return response.json() as Promise<T>;
}

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}