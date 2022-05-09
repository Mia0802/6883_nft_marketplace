import React, { Component } from "react";
// import provider from '../provider';
import Mcp from "mcp.js"
import pixleU from '../components/contracts/PixleU.sol/PixleU.json'
import { ProgressBar } from "react-bootstrap";
import './App.css';
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn} from 'mdb-react-ui-kit';

const mcp = new Mcp();
const address = "0x3A4E6F846B02976a4aB502c1ED6Bad4741bDf00F"
class App extends Component{


    async componentDidMount(){
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    // detect provider
    async loadWeb3(){
        if(typeof provider == 'undefined'){
            const provider =  window['aleereum'];
            console.log('yes')

            if(provider){
                await provider.connect()
        
                const accounts = await provider.account
                this.setState({account:accounts})
                console.log(this.state.account)
            } 
            // else {
            //     console.log('Wallet not Connect');
            // }

        } else {
            console.log('Wallet not Connect');
        }
    }

    async loadBlockchainData(){
        // const accounts = await provider.account
        // this.setState({account: accounts})
        // const accounts = await provider.account
        console.log(this.state.account)

        // const networkId = await provider.networkId
        // console.log(networkId)
        // const networkData = pixleU.networks[networkId]
        // console.log(pixleU.networks)

        // if(networkData){
        const abi = pixleU.abi;
        // console.log(addr)
        const contract = new mcp.Contract(abi, address);
        this.setState({contract})
        // console.log(this.state.contract);

        // call total supply of the collectibles
        const totalSupply = await contract.methods.totalSupply()
        this.setState({totalSupply})
        // console.log(this.state.totalSupply)

        for (let i = 1; i <= totalSupply; i++){
            const pixleU = await contract.methods.pixleUz(i - 1).call()
            this.setState({
                pixleUz: [...this.state.pixleUz, pixleU]
            })
        }

        // } else {
        //     window.alert('Smart Contract Not deployed')
        //     console.log('Error')
        // }
    // }

    }

    mint = (pixleU) => {
        this.state.contract.methods.mint(pixleU).sendBlock({from:this.state.account})
        .then('receipt', (receipt)=> {
            this.setState({
                pixleUz:[...this.state.pixleUz, pixleU]
            })
            console.log(this.state.pixleUz)
        })  
    }



    constructor(props){
        super(props);
        this.state = {
            account: '',
            contract: null,
            totalSupply: 5,
            pixleUz: []
        }
    }

    render() {
        return (
            <div className='container-filled'>
                {console.log(this.state.pixleUz)}
                <nav className='navbar navbar-dark fixed-top 
                bg-secondary flex-md-nowrap p-0 shadow'>
                <div className='navbar-brand col-sm-3 col-md-3 
                mr-0'>
                      PixelU NFTs
                </div>
                <ul className='navbar-nav px-3'>
                <li className='nav-item text-nowrap
                d-none d-sm-none d-sm-block
                '>
                <small className='text-white'>
                    {this.state.account}
                </small>
                </li>
                </ul>
                </nav>

                <div className='container-fluid mt-1'>
                    <div className='row'>
                        <main role='main' 
                        className='col-lg-12 d-flex text-center'>
                            <div className='content mr-auto ml-auto'
                            style={{opacity:'0.8'}}>
                                <h1 style={{color:'black'}}>
                                    PixelU - NFT Marketplace</h1>
                            <form onSubmit={(event)=>{
                                event.preventDefault()
                                const pixleU = this.pixleU.value
                                this.mint(pixleU)
                            }}>
                                <input
                                type='text'
                                placeholder='Add a file location'
                                className='form-control mb-1'
                                ref={(input)=>this.pixleU = input}
                                />
                                <input style={{margin:'6px'}}
                                type='submit'
                                className='btn btn-primary btn-black'
                                value='MINT'
                                />
                                </form>
                            </div>
                        </main>
                    </div>
                    <div className="row row1">
                        <div className="col-md-5" id = 'text1'>
                            <div className="row row2">
                                <div className='content mr-auto ml-auto'
                                        style={{opacity:'0.8'}}>
                                            <p style={{color:'black'}}>
                                                Discover, Collect, and Sell extraordinary NFTs</p>
                                            <br></br>
                                            <p style={{color:'black'}}>
                                                Create your own cartoon character</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5"> 
                            <div className="row">
                                <MDBCard className='token2 image' style={{maxWidth:'22rem'}}>
                                <MDBCardImage src="https://i.ibb.co/smfFw32/p1.png"  position='top' height='250rem' style={{marginRight:'4px'}} />
                                <MDBCardBody>
                                <MDBCardTitle> PixelU </MDBCardTitle> 
                                </MDBCardBody>
                                </MDBCard>
                                {/* <img src="https://i.ibb.co/smfFw32/p1.png" className="img-thumbnail" alt="..."></img>  */}
                            </div>
                        </div>
                    </div>
                    {/* <hr className = 'line'></hr> */}
                    <div className='row textCenter'>
                        {this.state.pixleUz.map((pixleU, key)=>{
                            return(
                                <div >
                                    <div>
                                        <MDBCard className='token img' style={{maxWidth:'22rem'}}>
                                            <MDBCardImage src={pixleU}  position='top' height='250rem' style={{marginRight:'4px'}} key="{pixleU}"/>
                                            <MDBCardBody>
                                                <MDBCardTitle> PixelU </MDBCardTitle> 
                                                <MDBCardText id='des'> The PixelU are 5 uniquely generated PixelU of our five cool developer from the cyberpunk cloud galaxy Mystopia! There is only one of each PixelU and each PixelU can be owned by a single person on the Computecoin blockchain. </MDBCardText>
                                                <MDBBtn href={pixleU}>Download</MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                            </div>
                                </div>
                            )
                        })} 
                    </div>
                </div>
            </div>
        )
    }
}

export default App;