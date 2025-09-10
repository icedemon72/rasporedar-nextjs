export const getPayloadURL = (checkForWindow: boolean = true): string => {
  if (
    checkForWindow &&
    typeof window === 'undefined' &&
    process.env.DOCKER_PAYLOAD_CMS_URL &&
    process.env.DEPLOY_ENV !== 'DEV'
  ) {
    return process.env.DOCKER_PAYLOAD_CMS_URL as string;
  }

  return process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL as string;
}

export const getApiURL = (checkForWindow: boolean = true): string => {
  if (
    checkForWindow &&
    typeof window === 'undefined' &&
    process.env.DOCKER_API_URL &&
    process.env.DEPLOY_ENV !== 'DEV'
  ) {
    return process.env.DOCKER_API_URL as string;
  }

  return process.env.NEXT_PUBLIC_API_URL as string;
}