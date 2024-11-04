function parseBookmarksFile(htmlContent){
    //Dom parser to parse the HTML content
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlContent, 'text/html');

    //Extracts all bookmark links
    const bookmarks = []
    const links = htmlDoc.querySelectorAll('a')
    //Preserves metadata like date added and icons
    
    links.forEach( link =>{
        const bookmark = {
            title: link.textContent.trim(),
            url: link.href,
            dateAdded: link.getAttribute('add_date') ? new Date(parseInt(link.getAttribute('add_date')) * 1000) : null,
            icon: link.getAttribute('icon'),
            tags:[]
        };
        

         // Get parent folders for tags
         let parent = link.parentElement;
        // The while loop loops through a block of code as long as a specified condition is true.
         while (parent && parent.tagName !== 'HTML') {
            // The Element.previousElementSibling read-only property returns the Element immediately prior to the specified one in its parent's children list, or null if the specified element is the first one in the list.
            if (parent.tagName === 'DL' && parent.previousElementSibling) {
                const folderTitle = parent.previousElementSibling.textContent.trim();
                if (folderTitle) {
                    //Maintains folder structure as tags
                    bookmark.tags.unshift(folderTitle);
                }
            }
            parent = parent.parentElement;
        
        }
        
        bookmarks.push(bookmark)
           
    })
        
    //Returns an array of structured bookmark objects
    return bookmarks

}

function readBookmarksFile(file){
    //Returns a Promise for async operation
    return new Promise ((resolve,reject)=>{
        //Handles file reading using FileReader
        const reader = new FileReader()

        // Execute a js immediately after a page has been loaded: onload
        reader.onload = (e)=>{
            try {
             const bookmarks = parseBookmarksFile(e.target.result);
             resolve(bookmarks)
            } catch (error) {
                reject(error)
            }
        };

        //Includes error handling
        reader.onload = (error) => reject(error);
        reader.readAsText(file)


    });
}