import { NextResponse } from 'next/server'
import { initBackgroundTasks } from '@/lib/tasks/init-tasks'

// Initialize tasks when this file is imported
let isInitialized = false
let initializationPromise: Promise<void> | null = null

if (!isInitialized) {
  isInitialized = true
  console.log('Starting background tasks initialization on server start')
  
  // Store the initialization promise
  initializationPromise = initBackgroundTasks().catch(error => {
    console.error('Error during background tasks initialization:', error)
  })
}

export async function GET() {
  // Wait for initialization to complete if it's in progress
  if (initializationPromise) {
    try {
      await initializationPromise
    } catch (error) {
      console.error('Error waiting for initialization:', error)
    }
  }
  
  return NextResponse.json({ 
    success: true, 
    message: 'Background tasks are running',
    initialized: isInitialized
  })
}

// Prevent hot reloading from re-initializing tasks
export const dynamic = 'force-dynamic' 