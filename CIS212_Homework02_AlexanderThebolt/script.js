function setPostDetails()
{
    //get session storage
    var postId = sessionStorage.getItem("postId");
    var posts = JSON.parse(sessionStorage.getItem("posts"));

    //find post in array
    var i = 0;
    while (posts[i].tit != postId) i++;

    //set post info
    document.getElementById("txt_html_postTitle").innerText = postId;

    document.getElementById("txt_html_postCategory").innerText = posts[i].cat;

    document.getElementById("txt_html_postArticle").innerText = posts[i].art;

    document.getElementById("txt_html_date").innerText = "Date Posted: " + posts[i].date;

    //add post links to list
    addPostToLinkList();
}

function createPost()
{
    var posts = JSON.parse(sessionStorage.getItem("posts"));

    //valid info check

    //unique title check
    for(var i = 0; i < posts.length; i++)
        if(posts[i].tit == document.getElementById("txt_html_postTitle").value)
            return;

    //console.log("unique title");

    //make sure all fields are filled
    if(document.getElementById("txt_html_postTitle").value == "" || document.getElementById("txt_html_postCategory").value == "" || document.getElementById("txt_html_postText").value == "")
        return;
    
    //add spot for new post
    posts[posts.length] = {};

    //console.log(document.getElementById("txt_html_postTitle").value);

    //add new post info
    posts[posts.length - 1].tit = document.getElementById("txt_html_postTitle").value;
    posts[posts.length - 1].cat = document.getElementById("txt_html_postCategory").value;
    posts[posts.length - 1].art = document.getElementById("txt_html_postText").value;
    posts[posts.length - 1].date = formatDate(new Date());

    //update storage
    sessionStorage.setItem("posts", JSON.stringify(posts));

    //get link list
    var postList = document.getElementById("postList");

    //create elements
    var newLi = document.createElement("li");
    var anchor = document.createElement("a");

    //set attributes of post
    anchor.setAttribute("class", "dropdown-item");
    anchor.href = "postDetails.html";
    anchor.setAttribute("onclick", "sessionStorage.setItem('postId', this.id)");
    anchor.id = document.getElementById("txt_html_postTitle").value;
    anchor.innerText = document.getElementById("txt_html_postTitle").value;

    //append link to list
    newLi.appendChild(anchor);
    postList.appendChild(newLi);

    clearTextboxes();
}

function clearTextboxes()
{
    document.getElementById("txt_html_postTitle").value = "";
    document.getElementById("txt_html_postCategory").value = "";
    document.getElementById("txt_html_postText").value = "";
}

function formatDate(date)
{
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-based
    var year = date.getFullYear();

    //console.log(`${month}/${day}/${year}`);

    return `${month}/${day}/${year}`;
}

//creates dummy posts and adds them to table
function initPosts()
{
    var posts = JSON.parse(sessionStorage.getItem("posts"));

    //if there are no posts in the storage, make dummy posts
    if (posts == null)
    {
        posts = [
            {tit: "I love tacos!!1!1", cat: "tacos", art: "Tellus eget leo habitant. Dolor. Commodo lacinia inceptos mattis sociosqu vel. Ipsum gravida sagittis nunc, rhoncus. Aliquam ac litora elit. Venenatis rutrum id pharetra. Dapibus mi mollis praesent. Massa cum id. Egestas. Scelerisque vulputate. Sociosqu fames neque. Pharetra class vivamus metus Eleifend est.", date: "10/12/2024"},
            {tit: "My taco time...", cat: "tacos", art: "Scelerisque dictum venenatis magnis. Scelerisque nunc orci. Sociosqu porta ipsum neque consequat sociis. Lacinia platea nascetur. Senectus commodo gravida sociosqu tellus nunc ullamcorper. Nisi eget enim class netus. Magna Curae; nisl nunc vulputate gravida mus scelerisque morbi montes faucibus. Ridiculus Penatibus rhoncus. Aliquam justo dignissim mattis odio eleifend class dignissim. Phasellus quis eros curae; magna sollicitudin auctor. Id molestie Lobortis a habitasse facilisi hac. Fames viverra libero torquent montes venenatis.", date: "10/15/2024"},
            {tit: "What is a taco?", cat: "tacos", art: "Lacus phasellus. Nulla ac hendrerit gravida et sagittis scelerisque class, morbi rhoncus aliquet. Sapien donec donec nibh facilisi leo sapien fringilla varius viverra iaculis elit lectus convallis ridiculus mauris eu nisi. Ornare suscipit nisl conubia. Platea scelerisque euismod facilisis. Conubia ridiculus adipiscing placerat. Mattis ultricies suscipit fusce lobortis.", date: "10/18/2024"}
        ];
        //console.log("test");
        sessionStorage.setItem("posts", JSON.stringify(posts));
    }

    for (var i = 0; i < posts.length; i++)
    {
        addPostToTable(posts[i]);
    }

    addPostToLinkList();
}

//add post to table functionality
function addPostToTable(post)
{
    //get table
    var table = document.getElementById("postsTable");

    //create new row in table
    var newRow = table.insertRow(table.rows.length);

    var anchor = document.createElement("a");

    //make table clickable
    anchor.id = post.tit;
    anchor.setAttribute("onclick","sessionStorage.setItem('postId', this.id)");
    anchor.href = "postDetails.html";

    //add table data tag to new row
    var newData = newRow.insertCell(table.rows[0].cells.length - 1);

    //put post info into tags
    var h5 = document.createElement("h5");
    h5.innerText = post.tit;

    var br = document.createElement("br");

    var p = document.createElement("p");
    p.innerText = post.art;

    //adds data to the anchor
    anchor.appendChild(h5);
    anchor.appendChild(br);
    anchor.appendChild(p);

    //puts anchor into table
    newData.appendChild(anchor);
}


// adds post to link list
function addPostToLinkList()
{
    var posts = JSON.parse(sessionStorage.getItem("posts"));

    for (var i = 0; i < posts.length; i++)
    {
        //get link list
        var postList = document.getElementById("postList");

        //create elements
        var newLi = document.createElement("li");
        var anchor = document.createElement("a");

        //set attributes of post
        anchor.setAttribute("class", "dropdown-item");
        anchor.href = "postDetails.html";
        anchor.setAttribute("onclick", "sessionStorage.setItem('postId', this.id)");
        anchor.id = posts[i].tit;
        anchor.innerText = posts[i].tit;

        //append link to list
        newLi.appendChild(anchor);
        postList.appendChild(newLi);

        //<li><a class="dropdown-item" href="postDetails.html" onclick="getPostInfo(this.id)" id="I love tacos!!1!1">I love tacos!!1!1</a></li>   
    }
}

function deletePost()
{
    //get session storage
    var postId = sessionStorage.getItem("postId");
    var posts = JSON.parse(sessionStorage.getItem("posts"));

    //find post in array
    var i = 0;
    while (posts[i].tit != postId) i++;

    posts.splice(i,1);

    sessionStorage.setItem("posts", JSON.stringify(posts));
}