import React, { useState, useCallback, useLayoutEffect } from 'react'
import Toast from 'react-bootstrap/Toast'

import useNotification from '../hooks/useNotification'

const toastClassNames = {
    success: { bg: 'bg-success', title: 'Success', txt: 'text-light' },
    error: { bg: 'bg-danger', title: 'Error', txt: 'text-light' },
    info: { bg: 'bg-info', title: 'Info', txt: 'text-light' }
}

const classNameKeys = Object.keys(toastClassNames)

const Notification = ({ id, message, timeout, level }) => {
    const [show, setShow] = useState(true)

    const notificationHelper = useNotification()

    const classNames = classNameKeys.includes(level)
        ? toastClassNames[level]
        : { bg: null, title: null, txt: null }

    const remove = useCallback(() => {
        setShow(false)
    }, [])

    useLayoutEffect(() => {
        setTimeout(() => {
            notificationHelper.remove(id)
        }, timeout)
    }, [id, timeout, notificationHelper])

    return (
        <Toast onClose={remove} show={show} delay={timeout} autohide>
            <Toast.Header>
                <strong className='mr-auto'>{classNames.title}</strong>
            </Toast.Header>
            <Toast.Body className={classNames.bg}>
                <span className={classNames.txt}>{message}</span>
            </Toast.Body>
        </Toast>
    )
}

export default Notification
