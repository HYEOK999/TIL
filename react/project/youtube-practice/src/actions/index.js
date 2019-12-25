export const UPDATE_QUERY = 'UPDATE_QUERY';
export const LIKE = 'LIKE';
export const COMMENT = 'COMMENT';
export const DELETECOMMENT = 'DELETECOMMENT';

export function updateQuery(query) {
  return ({type:UPDATE_QUERY, query})
}

export function like(id, toggle_like) {
  return ({type:LIKE, id, toggle_like})
}

export function comment(id, val) {
  return ({type:COMMENT, id, val})
}

export function deleteComment(id, commentId) {
  return ({type:DELETECOMMENT, id, commentId})
}
