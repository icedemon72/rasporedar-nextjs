'use client';

import dynamic from "next/dynamic";

const ToastContainer = dynamic(() => import('@/components/providers/toast/ToastContainerProvider'));

export default ToastContainer;