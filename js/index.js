// grab the button & the input value

const submitForm = document.getElementById('github-form')


submitForm.addEventListener('submit', function(e){
	const inputValue = document.getElementById('search').value
  e.preventDefault()
  
  let url = `https://api.github.com/search/users?q=${inputValue}`
  
  	fetch(url)
    .then(res => res.json())
  	.then(user => {
    	const container = document.getElementById('user-list')
      const userName = Object.entries(user)[2][1]
      
     
      
      	userName.forEach(function(x){
        	const userName2 = document.createElement('li')
          userName2.className = "users"
          userName2.innerHTML = `         
          <p>User: ${x['login']} URL: ${x['url']} Repo: <button class="repo">Repo</button></p>`
          container.appendChild(userName2)         
                   
        })        
  		
      // repo button
        const btn = document.querySelectorAll('.repo')
      
        
        btn.forEach(function(z,y){
        	z.addEventListener('click', function(){
          	let userGrab = userName[y]['login']
            let newURL = `https://api.github.com/users/${userGrab}/repos`
            console.log(newURL)
            
            fetch(newURL)
            .then(res => res.json())
            .then(repoInfo => {
            	const repoList = document.getElementById('repos-list')
              const repoData = Object.entries(repoInfo)
              
                            
              // post repo on DOM
              
              repoData.forEach(function(z){
        	const repoName1 = document.createElement('li')
          repoName1.className = "repo"
          repoName1.innerHTML = `         
          Repo: ${z[1]['name']}`
          container.appendChild(repoName1)         
                  
        })                        
                                        
    
            })
            
          })
        })
        
    })
    .catch(error => console.log("ERROR"))


})