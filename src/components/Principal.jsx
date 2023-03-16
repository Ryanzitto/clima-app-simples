import React from "react";
import styled from 'styled-components'
import { useState } from "react";

const Section = styled.div`
width: 100vw;
height: 100vh;
background-color: #cad9e6;
display: flex;
justify-content: center;
align-items: center;
`
const Container = styled.div`
width: 500px;
height:500px;
background-color: #eeeaea;
border-radius:20px;
`
const ContainerHeader = styled.div`
background-color: #6b6b6b;
height: 60px;
border-top-left-radius: 20px 20px;
border-top-right-radius: 20px 20px;
display: flex;
justify-content: center;
align-items: center;
gap:10px;
`
const Input = styled.input`
border: none;
border-radius:10px;
background-color: #afa9a9;;
height: 30px;
color: #ffffff;
font-size:16px;
font-weight: 600;
text-align: center;
width: 150px;

&:focus{
    outline: none;
}
`
const Search = styled.img`
height: 18px;
width: 18px;
cursor: pointer;
padding: 6px;
border-radius: 10px;
background-color: #71c8e2;

&:hover{
    background-color: #4ac2e7f9;
}
`
const Corpo = styled.div`
width: 100%;
height:100%;
`
const CidadeContainer = styled.div`
height:20%;
width:100%;
display: flex;
justify-content: center;
align-items: center;
`
const Icon = styled.img`
height: 30px;
width: 30px;
gap:20px;
cursor: pointer;
`
const TemperaturaContainer = styled.div`
height:10%;
width:100%;
text-align:center;
display:flex;
justify-content: center;
align-items:center;
`
const Temperatura = styled.h1`
font-family: "Roboto" , sans-serif;
font-size: 30px;
margin-bottom:30px;
`
const Cidade = styled.h1`
font-family: "Roboto" , sans-serif;
margin-left:10px;
`
const DescricaoContainer = styled.div`
height:30%;
width:100%;
text-align:center;
display:flex;
justify-content: center;
align-items:center;
flex-direction: column;
`
const Descricao = styled.p`
font-family: "Roboto" , sans-serif;
font-size:16px;
letter-spacing: 2px;
padding-top:20px;
`
const IconeDoTempo = styled.img`
width: 130px;
height: 130px;
animation: animaIcone 2s infinite ease alternate ;

@keyframes animaIcone {
    100%{
        transform: translateY(10px);
    }
}
`
const FooterContainer = styled.div`
height:28%;
width:100%;
border-bottom-right-radius: 20px 20px;
border-bottom-left-radius: 20px 20px;
display: flex;
justify-content:center;
align-items: center;
`
const Left = styled.div`
width:50%;
height:100%;
display:flex;
justify-content: center;
align-items: center;
gap:15px;
`
const Right = styled.div`
width:50%;
height:100%;
display:flex;
justify-content: center;
align-items: center;
gap:15px;
`
const Line = styled.div`
width:1px;
height:50%;
background-color: white;
`
const Humidity = styled.h1`
font-family: "Roboto" , sans-serif;
`
const Wind = styled.h1`
font-family: "Roboto" , sans-serif;
`

const Principal = () => {

    const apiKey = "527ca2693cd99e5aba655d5cfd0d981a"

    const [cidade, setCidade] = useState('')
    const [dados, setDados] = useState("")
    const [NovaTela, setNovaTela] = useState()

const buscarDados = async() =>{

    try{
        setNovaTela(false)
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`         
        const resposta = await fetch(apiWeatherURL)
        const data = await resposta.json()
        setDados(data)
        setNovaTela(true)
        // console.log(dados)
    }
        catch(error){console.log("deu ruim mane")}
    }

    return (
        <Section>
            <Container>

                <ContainerHeader>
                    <Input onChange={(e) => setCidade(e.target.value)}/>
                    <Search onClick={buscarDados} src="./search.png"/>
                </ContainerHeader>

                {NovaTela === true &&
                <Corpo>

                    <CidadeContainer>
                        <Icon src="./map.png"/>
                        {dados.name ? <Cidade>{dados?.name}</Cidade> : <Cidade>Essa cidade não existe!</Cidade>}
                    </CidadeContainer> 

                    <TemperaturaContainer>
                        <Temperatura>{dados?.main?.temp.toFixed(0)}°C</Temperatura>
                    </TemperaturaContainer>

                    {dados.weather && dados.weather.length > 0 ?
                        <DescricaoContainer>
                            {dados?.weather[0]?.main === 'Clouds' && <IconeDoTempo src="./cloud.png"/>}
                            {dados?.weather[0]?.main === 'Clear' && <IconeDoTempo src="./sun.png"/>}
                            {dados?.weather[0]?.main === 'Rain' && <IconeDoTempo src="./rain.png"/>}
                            {dados?.weather[0]?.main === 'Thunderstorm' && <IconeDoTempo src="./thunderstorm.png"/>}
                            <Descricao>{dados?.weather[0]?.description}</Descricao>
                        </DescricaoContainer> 
                        : null}

                    <FooterContainer>
                        <Left>
                            <Icon src="./drop.png"/>
                            <Humidity>{dados?.main?.humidity}%</Humidity>
                        </Left>
                        <Line></Line>
                        <Right>
                            <Icon src="./wind.png"/>
                            <Wind>{dados?.wind?.speed.toFixed(0)}/h</Wind>
                        </Right>                      
                    </FooterContainer>
                </Corpo>}     
            </Container>
        </Section>
        );
    }
export default Principal;