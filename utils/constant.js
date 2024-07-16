export const DEFAULT_ERROR_MESSAGE = {
  400: 'Bad Request: Please check the data you are sending.',
  401: `Not Authenticated: Sorry, you have to be logged in to access the app.`,
  403: `Not Authorized: Sorry, you are not allowed to access this functionality`,
  404: `Not Found: We couldn't find what you're looking for.`,
  422: 'Validation Error',
  500: 'Server Error: Please contact the support team.',
  412: 'This feature is disabled',
};

// For alert module store
export const GET_ALERT_NOTIFICATION = 'getAlertNotification';
export const SET_ALERT_NOTIFICATION = 'setAlertNotification';
export const SHOW_ALERT_NOTIFICATION = 'showAlertNotification';
export const SHOW_IMPERSONATION = 'showImpernationAlert';
export const SET_ALERT_NOTIFICATION_CODE = 'setAlertNotificationCode';
export const SET_ALERT_NOTIFICATION_COLOR = 'setAlertNoticationColor';

export const TAB_OFFER = {
  ALL_OFFERS: 'All Offers',
  OUTSTANDING_OFFER: 'Outstanding Offer',
  OUTSTANDING_PAYMENT: 'Outstanding Payment',
  PAID: 'Paid',
  EXECUTED: 'Executed',
  LOST: 'Lost',
};

export const STATUS = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  INCOMPLETE: 'INCOMPLETE',
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
  MERGE: 'MERGE',
};
