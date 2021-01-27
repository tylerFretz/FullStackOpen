import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../queries/clientQueries'

const useNotification = () => {
    const [addNotification] = useMutation(ADD_NOTIFICATION)
    const [removeNotification] = useMutation(REMOVE_NOTIFICATION)

    const add = useCallback(
        async (message, level = '', timeout = 5000) => {
            await addNotification({ variables: { message, timeout, level } })
        },
        [addNotification]
    )

    const addMultiple = useCallback(
        async (messages, level = '', timeout = 5000) => {
            for (let message of messages) {
                await addNotification({
                    variables: { message, level, timeout }
                })
            }
        },
        [addNotification]
    )

    const remove = useCallback(
        async (id) => {
            await removeNotification({ variables: { id } })
        },
        [removeNotification]
    )

    return { add, addMultiple, remove }
}

export default useNotification