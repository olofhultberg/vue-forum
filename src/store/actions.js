import firebase from 'firebase';
import { isArray } from 'util';


export default {

      fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', {id, emoji: '🗂', resource: 'categories'}),
      fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', {id, emoji: '☀️', resource: 'forums'}),
      fetchThread: ({ dispatch}, { id }) =>dispatch('fetchItem', {id, emoji: '📄', resource: 'threads'}),
      fetchUser: ({ dispatch}, { id }) =>dispatch('fetchItem', {id, emoji: '💁🏼‍', resource: 'users'}),
      fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', {id, emoji: '📩', resource: 'posts'}),
          
      fetchCategories: ({dispatch},{ids})=>  dispatch('fetchItems', {resource: 'categories', emoji: '🗂', ids}),
      fetchForums: ({dispatch},{ids})=>  dispatch('fetchItems', {resource: 'forums', emoji: '🌤', ids}),
      fetchThreads: ({dispatch},{ids})=>  dispatch('fetchItems', {resource: 'threads', emoji: '📄', ids}),
      fetchPosts: ({dispatch},{ids})=>  dispatch('fetchItems', {resource: 'posts', emoji: '💬', ids}),
      fetchUsers: ({dispatch},{ids})=>  dispatch('fetchItems', {resource: 'users', emoji: '💁🏼‍♂️', ids}),
     
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
        ids = isArray(ids) ? ids : Object.keys(ids);
         return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource, emoji})))
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
    
}