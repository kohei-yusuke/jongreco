import {useEffect} from 'react';
import Router from 'next/router';
import {useBeforeUnload} from 'react-use';

const useLeavePageConfirmation = (
    showAlert = true,
    message = 'その操作は推奨されません'
) =>{
    useBeforeUnload(showAlert, message);

    useEffect(() =>{
        const handler = () =>{
            if (showAlert && !window.confirm(message)){
                throw 'キャンセル';
            }
        };

        Router.events.on('routeChangeStart', handler);

        return () =>{
            Router.events.off('routeChangeStart', handler);
        };
    },[showAlert, message]);
};

export default useLeavePageConfirmation;