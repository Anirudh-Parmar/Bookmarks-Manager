const search = document.querySelector('#search')
const inputFile = document.querySelector('#bookmarkFile')
const diplayBookmarks = document.querySelector('.bookmarks-container')


//Set up the file input listener

// inputFile.addEventListener('change',(e)=>{
//     if (e.target.files[0]) {
//         // document.body.append(`You selected ${e.target.files[0].name}`)
//         diplayBookmarks.innerHTML = `You selected ${e.target.files[0].name}`
//     }
// })
//or
inputFile.addEventListener('change', async (event) => {
    const bookmarks = await readBookmarksFile(event.target.files[0]);
    // Process bookmarks as needed
  });
  

//Create the bookmark parser

//Implement basic display of bookmarks

//Add local storage functionality