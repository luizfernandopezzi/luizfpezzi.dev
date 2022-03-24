
import Head from 'next/head'
import getUser from '../utils/getUser.js'

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
  const { repos, user } = await getUser('luizfernandopezzi')  
  return {
      props: {
          repos,
          user
      }
  }
}