import Vue from 'vue'
import Vuex from 'vuex'
import { countObjectProperties } from '@/utils'
import firebase from 'firebase'

Vue.use(Vuex)

const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { parentId, childId }) => {
    const resource = state[parent][parentId]
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }
}

export default new Vuex.Store({
  state: {
    categories: {},
    posts: {},
    threads: {},
    users: {},
    forums: {},
    authId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2'
  },

  getters: {
    authUser (state) {
      // return state.users[state.authId]
      return {}
    },
    usersThreadCount: state => id => countObjectProperties(state.users[id].threads),
    repliesCount: state => id => countObjectProperties(state.threads[id].posts),
    usersPostCount: state => id => countObjectProperties(state.users[id].posts)
    // SAME AS:
    // usersPostCount (state) {
    //   return function (id) {
    //     return countObjectProperties(state.users[id].posts)
    //   }
    // }
  },

  actions: {
    fetchThread ({ dispatch}, { id }) {
      return dispatch('fetchItem', {id, emoji: '📄', resource: 'threads'})
    },
    fetchUser ({ dispatch}, { id }) {
      return dispatch('fetchItem', {id, emoji: '💁🏼‍', resource: 'users'})
    },
    fetchPost ({ dispatch }, { id }) {
      return dispatch('fetchItem', {id, emoji: '📩', resource: 'posts'})
    },

    fetchPosts({dispatch},{ids}){
        return dispatch('fetchItems', {resource: 'posts', emoji: '💬', ids})
    },

    fetchForums({dispatch},{ids}){
      return dispatch('fetchItems', {resource: 'forums', emoji: '🌤', ids})
  },

    fetchItem ({ state, commit }, { id, emoji, resource }) {
      console.log('🔥', emoji, id)
      // fetch thread
      return new Promise((resolve, reject) => {
        firebase.database().ref(resource).child(id).once('value', snapshot => {
            // Set item in state
            commit('setItem', {resource, id: snapshot.key, item: snapshot.val()})
            resolve(state[resource][id])
          })
      })
    },

    fetchItems({dispatch},{ids,resource,emoji}){
       return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource, emoji})))
    },

    fetchAllCategories({state, commit}){
      console.log('🔥', '🗂', 'all')
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const categoriesObject = snapshot.val()
          Object.keys(categoriesObject).forEach(categoryId => {
            const category = categoriesObject[categoryId]
            commit('setItem', {resource: 'categories', id: categoryId, item: category})
        })
        resolve(Object.values(state.categories))
        })
      })
    },
    
    createPost ({ commit, state }, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', { post, postId })
      commit('appendPostToThread', { parentId: post.threadId, childId: postId })
      commit('appendPostToUser', { parentId: post.userId, childId: postId }) // Return a promise when done
      return Promise.resolve(state.posts[postId])
    },
    createThread ({ state, commit, dispatch }, { text, title, forumId }) {
      return new Promise((resolve, reject) => {
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const threadId = 'greatThread' + Math.random()
        const thread = {
          '.key': threadId,
          title,
          forumId,
          publishedAt,
          userId
        }
        commit('setThread', { thread, threadId })
        commit('appendThreadToForum', { parentId: forumId, childId: threadId })
        commit('appendThreadToUser', { parentId: userId, childId: threadId })
        dispatch('createPost', { text, threadId }).then(post => {
          commit('setThread', {
            threadId,
            thread: { ...thread, firstPostId: post['.key'] }
          })
        })
        resolve(state.threads[threadId])
      })
    },
    updateThread ({ state, commit, dispatch }, { text, title, id }) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        // const post = state.posts[thread.firstPostId]
        const newThread = { ...thread, title }
        // const newPost = { ...post, text }
        // commit('setPost', { post: newPost, postId: thread.firstPostId })
        commit('setThread', { thread: newThread, threadId: id })
        dispatch('updatePost', { id: newThread.firstPostId, text }).then(() => {
          resolve(newThread)
        })
      })
    },
    updatePost ({ state, commit }, { id, text }) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        })
        resolve(post)
      })
    },
    updateUser ({ commit }, user) {
      commit('setUser', { userId: user['.key'], user })
    }
  },
  mutations: {
    setPost (state, { post, postId }) {
      Vue.set(state.posts, postId, post)
    },
    setUser (state, { user, userId }) {
      Vue.set(state.users, userId, user)
    },
    setThread (state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread)
    },
    setItem (state, { item, id, resource }) {
      item['.key']=id
      Vue.set(state[resource], id, item)
    },
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendPostToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
  }
})
