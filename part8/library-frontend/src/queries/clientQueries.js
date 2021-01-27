import { gql } from '@apollo/client'


export const ALL_NOTIFICATIONS = gql`
  query allNotifications {
    allNotifications @client
  }
`

export const ADD_NOTIFICATION = gql`
  mutation addNotification($message: String!, $timeout: Int, $level: String) {
    addNotification(message: $message, timeout: $timeout, level: $level) @client
  }
`

export const REMOVE_NOTIFICATION = gql`
  mutation removeNotification($id: ID!) {
    removeNotification(id: $id) @client
  }
`