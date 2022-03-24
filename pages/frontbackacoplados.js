import Head from 'next/head'
import Image from 'next/image'

export default function Home( {repos, user} ) {
  return (
    <div className='container mx-auto'>
      <h1 className='text-5x1'>Olá, eu sou o Luiz Fernando Pezzi!</h1>
      <h2 className='font-bold text-3x1'>Meus repositórios do GitHub</h2>
      <p>GitHub stats: public repos {user.public_repos} / public_gists: {user.public_gists}</p>
      {repos.map( (repo, index) => {
          return(
              <div key={repo.id} className='rounded bg-gray-200 mx-8 my-4 p-4 hover:shadow-md'>
                  <h3 className='font-bold'>{repo.full_name}</h3>
                  <p>Linguagem: {repo.language}, Stars: {repo.stargazers_count}</p>
              </div>
          )
      })}
    </div>
  )
}

// Backend: acesso de bando de dados, manipulação de dados, validação...
export async function getServerSideProps(context){
  const resUser = await fetch('https://api.github.com/users/luizfernandopezzi')
  const user = await resUser.json();

  const resRepos = await fetch('https://api.github.com/users/luizfernandopezzi/repos');
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
  
  return {
      props: {
          repos,
          user
      }
  }
}