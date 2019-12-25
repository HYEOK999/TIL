import { UPDATE_QUERY } from '../actions'
import { LIKE } from '../actions'
import { COMMENT } from '../actions'
import { DELETECOMMENT } from '../actions'


const INITIAL_STATE = {
  query : '',
  data: {}
}

export default function videoInfo(state = INITIAL_STATE, action ){
  const data = state.data[action.id]
  switch(action.type) {
    case UPDATE_QUERY :
      return {
        ...state, // 스테이트가 1개인 경우, 사용해줄 필요 X
        query: action.query
      };
    case LIKE :
      // const video = state.data[action.id]
      // JS
      if(action.toggle_like) {
        return {
          ...state, // 쿼리를 보존하기위해서
          data: {
            ...state.data, // 나중에 추가될 데이터를 보존하기위해서
            [action.id]: {
              ...data, // Comment의 데이터를 보존하기 위해서 나열해주엇음.
              likeCount: data && data.likeCount
                ? data.likeCount + 1
                : 1,
              // disLikeCount: data
              //   ? data.disLikeCount
              //   : 0,
            }
          }
        }
      } else {
        return {
          ...state, // 쿼리를 보존하기위해서
          data: {
            ...state.data, // 나중에 추가될 데이터를 보존하기위해서
            [action.id]: {
              ...data, // Comment의 데이터를 보존하기 위해서 나열해주엇음.
                // likeCount: data
                //   ? data.likeCount
                //   : 0,
              disLikeCount: data && data.disLikeCount
                ? data.disLikeCount + -1
                : -1,
            }
          }
        }
      };
    case COMMENT :
      return {
        ...state,
        data : {
          ...state.data,
          [action.id]: {
            ...data,
            comments: data && data.comments
              ? [ { text: action.val, cid : Math.max(-1, ...data.comments.map((id) => id.cid)) + 1 }, ...data.comments ]
              : [{ text: action.val, cid : 0 }],
          }
        }
      };
    case DELETECOMMENT :
      return {
        ...state,
        data : {
          [action.id]: {
            comments: data && data.comments.filter((comment) => {
              return comment.cid !== action.commentId
            })
          }
        }
      };
    default:
      return state;
  }
}