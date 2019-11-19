import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import fpGet from 'lodash/fp/get'
import axios from 'utils/axios'
import sprintf from 'sprintf'

// Export const listFetchAction = (data, type) => {
//   Return (dispatch, getState) => {
//     Const params = {
//       'page_size': 150
//     }
//     Const payload = axios({dispatch, getState})
//       .get(API.USER_ADDRESS, {params})
//       .then(response => {
//         Return fpGet('data', response)
//       })
//     Return dispatch({
//       Payload,
//       Type: actionTypes.USER_ADDRESS_LIST
//     })
//   }
// }
const contact_phone = '123123'
export const addressCreateAction = (data) => {
  return (dispatch, getState) => {
    const params = {
      location: {
        lat: 41.2978462,
        lon: 69.27365476
      },
      address: fpGet('location', data),
      phone: fpGet('phoneNumber', data),
      contact_person: fpGet('name', data),
      //      Contact_person: contact_phone
    }
    const payload = axios({ dispatch, getState })
      .post(API.CREATE_ADDRESS, params)
      .then(response => {
        return fpGet('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.CREATE_ADDRESS
    })
  }
}

// Export const addressDeleteAction = (id) => {
//   Return (dispatch, getState) => {
//     Const payload = axios({dispatch, getState})
//       .delete(sprintf(API.USER_ADDRESS_ITEM, id))
//       .then(response => {
//         Return fpGet('data', response)
//       })

//     Return dispatch({
//       Payload,
//       Type: actionTypes.USER_ADDRESS_CREATE
//     })
//   }
// }
