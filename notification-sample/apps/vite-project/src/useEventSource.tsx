import { useCallback, useRef } from "react"



export function useEventSource() {
    const eventSourceRef = useRef<EventSource | null>(null)

    const connectToEventSource = useCallback((eventSourceUrl: string, onMessage?: () => void) => {
        if (eventSourceRef.current === null) {
            const eventSource = new EventSource(eventSourceUrl)

            eventSource.onmessage = function (msg) {
                const data = JSON.parse(msg.data)
                console.log(msg, data)
            }

            eventSource.onerror = function (msg) {
                console.log(msg)
            }

            eventSourceRef.current = eventSource
            return
        }
        if (eventSourceRef.current.readyState === eventSourceRef.current.CONNECTING) {
            // 同一URLで接続が確立しているため無視
            if (eventSourceRef.current.url === eventSourceUrl) {
                return
            }
        } else if (eventSourceRef.current.readyState === eventSourceRef.current.OPEN) {
            // 同一URLで接続
            if (eventSourceRef.current.url === eventSourceUrl) {
                // ReConnectionの確立
            }
        } else if (eventSourceRef.current.readyState === eventSourceRef.current.CLOSED) {
            // 同一URLで接続
            if (eventSourceRef.current.url === eventSourceUrl) {
                // ReConnectionの確立
            }
        }
    }, [])


  const closeEventSource = useCallback(() => {
    if(eventSourceRef.current !== null) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
    }
  }, [eventSourceRef.current])

    return {
        closeEventSource,
        connectToEventSource
    }
}