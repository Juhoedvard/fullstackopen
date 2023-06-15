const dummy = (blogs) => {
    if(blogs){
      return 1
    }
  }

const totalLikes = (blogs) =>{

    let likes = blogs.reduce(function (a, b) {
      return a + b.likes}, 0 )
    
      return likes
  }

  const favoriteBlog = (blogs) =>{

    let favorite = blogs.reduce((previous, current) => {
      return previous.likes > current.likes ? previous : current
    })
    return favorite
    
  }


  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }