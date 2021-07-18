import React from 'react';


interface Iprops {
  funcao: any;
  dados: any;
  className?: any;
}

const Lista: React.FC<Iprops> = ({ funcao, dados, className = '' }: Iprops) => {
  return (
    <div className={`${className}`}>
  		{dados.map(funcao)}
  	</div>
  )
}

export default Lista;