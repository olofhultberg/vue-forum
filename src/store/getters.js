import { countObjectProperties } from '@/utils'

export default {
    authUser (state) {
        //return state.users[state.authId]
        return {}
      },
      usersThreadCount: state => id => countObjectProperties(state.users[id].threads),
      repliesCount: state => id => countObjectProperties(state.threads[id].posts)-1,
      usersPostCount: state => id => countObjectProperties(state.users[id].posts)
      // SAME AS:
      // usersPostCount (state) {
      //   return function (id) {
      //     return countObjectProperties(state.users[id].posts)
      //   }
      // }
}