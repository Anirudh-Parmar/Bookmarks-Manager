const search = document.querySelector('#search')
const inputFile = document.querySelector('#bookmarkFile')
const displayBookmarkList = document.querySelector('.bookmarks-container')


//Set up the file input listener

inputFile.addEventListener('change', async (event) => {
    const bookmarks = await readBookmarksFile(event.target.files[0]);
    displayBookmarks(bookmarks)
  });


//Create the bookmark parser : done

//Implement basic display of bookmarks
function displayBookmarks(bookmarks){
    //input is an array of objects, each containing properties like title and url
    displayBookmarkList.innerHTML = ''; //clear the prev. content

    bookmarks.forEach(bookmark => {
           // Ensure the bookmark has a title and URL
           if (!bookmark.title || !bookmark.url) {
            console.warn("Skipping invalid bookmark:", bookmark);
            return; // Skip this bookmark if it doesn’t have the necessary data
        }

        const bookmarkDiv = document.createElement('div')
        bookmarkDiv.className = 'bookmark'

        const link = document.createElement('a')
        link.href = bookmark.url;
        link.target = '_blank';
        link.textContent = bookmark.title || bookmark.url

        // Append link to the bookmark div
        bookmarkDiv.appendChild(link)

         // Append the bookmark div to the container
        displayBookmarkList.appendChild(bookmarkDiv)

        
    });
    
}

//Add local storage functionality
