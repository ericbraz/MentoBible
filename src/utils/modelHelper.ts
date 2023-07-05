export function generateID() {
   const size = 28
   const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
   let id = ''

   for (let i = 0; i < size; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length))
   }

   return id
}
