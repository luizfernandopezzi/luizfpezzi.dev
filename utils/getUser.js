// Backend: acesso de bando de dados, manipulação de dados, validação...

const getUser = async(username) => {
    const resUser = await fetch('https://api.github.com/users/'+username)
    const user = await resUser.json();
  
    const resRepos = await fetch(`https://api.github.com/users/${username}/repos`);
    const originalRepos = await resRepos.json();
    const dontShowRepos = ['luizfernandopezzi/AvantiStore', 'luizfernandopezzi/ConvertMyMoney']
  
    function reposNotForkFilter(repo){
        return !repo.fork
    }
    const reposNotForkFiltered = originalRepos.filter(reposNotForkFilter)
    
    function dontShowReposFilter(repo){
        return dontShowRepos.indexOf(repo.full_name) < 0
    }
    const reposNotShowFiltered = reposNotForkFiltered.filter(dontShowReposFilter)
    
    function extractData(repo){
        return (
            {
                id: repo.id,
                full_name: repo.full_name,
                language: repo.language,
                stars: repo.stargazers_count
            }
        )
    }
    const repos = reposNotShowFiltered.map(extractData)

    return { repos, user }
}

export default getUser