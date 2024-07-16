import { DEFAULT_ERROR_MESSAGE } from '../utils/constant';

const useError = () => {
  const parseErrorMessage = (err) => {
    if (err.response?.data || err.data) {
      const messages = getMessageKeys(err.response.data || err.data);
      if (messages.length > 0) {
        return messages.join('\n');
      }
    }

    return DEFAULT_ERROR_MESSAGE[500];
  };
  function getMessageKeys(obj) {
    const messageKeys = [];
    for (const key in obj) {
      if (key === 'message') {
        if (typeof obj[key] === 'object') {
          const nestedMessageKeys = getMessageKeys(obj[key]);
          messageKeys.push(...nestedMessageKeys);
        } else {
          messageKeys.push(obj[key]);
        }
      } else if (typeof obj[key] === 'object') {
        const nestedMessageKeys = getMessageKeys(obj[key]);
        messageKeys.push(...nestedMessageKeys);
      }
    }
    return messageKeys;
  }

  return { parseErrorMessage };
};

export default useError;
