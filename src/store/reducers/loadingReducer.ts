/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 18-04-2017
 */

 import { Action } from "@ngrx/store";

 export interface ILoadingState {
   loading: boolean;
 };

 export const intitialState:ILoadingState = {
   loading: false
 }

 export function reducer (state:ILoadingState = intitialState, action:Action):ILoadingState {
     //console.log('LOADER REDUCER-> ', action);
     switch (action.type) {

       case 'GET_DATAS_ARRAY': {
         return Object.assign({}, state, { loading: true})
       }
       case 'GET_DATAS_ARRAY_SUCCESS': {
         return Object.assign({}, state, { loading: false})
       }
       case 'GET_DATAS_ARRAY_FAILED': {
         return Object.assign({}, state, { loading: false})
       }

       case 'UPDATE_DATA': {
         return Object.assign({}, state, { loading: true})
       }
       case 'UPDATE_DATA_SUCCESS': {
         return Object.assign({}, state, { loading: false})
       }
       case 'UPDATE_DATA_FAILED': {
         return Object.assign({}, state, { loading: false})
       }

       case 'DELETE_DATA': {
         return Object.assign({}, state, { loading: true})
       }
       case 'DELETE_DATA_SUCCESS': {
         return Object.assign({}, state, { loading: false})
       }
       case 'DELETE_DATA_FAILED': {
         return Object.assign({}, state, { loading: false})
       }

       case 'CREATE_DATA': {
         return Object.assign({}, state, { loading: true})
       }
       case 'CREATE_DATA_SUCCESS': {
         return Object.assign({}, state, { loading: false})
       }
       case 'CREATE_DATA_FAILED': {
         return Object.assign({}, state, { loading: false})
       }

       case 'CHECK_AUTH': {
         return Object.assign({}, state, { loading: true })
       }
       case 'CHECK_AUTH_SUCCESS': {
         return Object.assign({}, state, { loading: false })
       }
       case 'CHECK_AUTH_FAILED': {
         return Object.assign({}, state, { loading: false })
       }
       case 'CHECK_AUTH_NO_USER': {
         return Object.assign({}, state, { loading: false })
       }
       default: {
         return <ILoadingState>state;
       }
     }
 };
