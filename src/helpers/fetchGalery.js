import axios from "axios";
// const URL = 'https://pixabay.com/api';
// // ключ до pixabay
// const KEY = '24559176-3d230645e3ee8093547203063';

// отримує масив картинок з pixabay
export async function fetchGalery(inputText, page) {
    const url = await fetch(`https://pixabay.com/api/?key=24559176-3d230645e3ee8093547203063&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    return await axios.get(url);
}

// без async/await
// export function fetchGalery (inputText, page) {
//     return fetch(`https://pixabay.com/api/?key=${KEY}&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
//     ).then(response => {
//         if(response.ok) {
//             return responce.json();
//         }
//     throw Error('The image is not definde')
//     })
// }

// приклад з конспекту 
// const fetchUsers = async () => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await response.json();
//     return users;
//   };
  
//   fetchUsers().then(users => console.log(users));