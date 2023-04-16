import React from 'react';
import './styles/BadgeEdit.css';
import header from '../images/platziconf-logo.svg';
import BadgeForm from '../components/BadgeForm';
import Badge from '../components/Badge';
import api from '../api';
import PageLoading from '../components/PageLoading';

class BadgeEdit extends React.Component{
    state={
        loading:true,
        error:null,
        form:{
            firsName:'',
            lastName:'',
            email:'',
            job:'',
            twitter:'',
        }
    };

    componentDidMount(){
        this.fetchData();
    }

    fetchData=async e=>{
        this.setState({loading:true, error:null})
        try{
            const data=await api.badges.read(
                this.props.match.params.badgeId
            )
            this.setState({loading:false, form:data})
        }catch(error){
            this.setState({loading:false, error:error})
        }
    }

    handleChange=e=>{ 
        this.setState({
            form:{
                /*Esta línea evita que cada que pongamos algo en el formulario se reescriba el valor anterior*/
                ...this.state.form,
                [e.target.name]:e.target.value,
            },
        });
    };

    handleSubmit=async e=>{
        /*e.preventDefault() evita que el evento de enviar y borrar fromulario se ejecute*/
        e.preventDefault();
        this.setState({loading:true, error:null})
        try{
            await api.badges.update(this.props.match.params.badgeId, this.state.form);
            this.setState({loading:false});

            this.props.history.push('/badges')
        } catch(error){
            this.setState({loading:false, error:error})
        }
    }

    render(){
        if (this.state.loading){
            return <PageLoading/>
        }
        return (
            <div>
                <div className="BadgeEdit__hero">
                    <img className="BadgeEdit__hero-image img-fluid" src={header} alt="logo" />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                           <Badge 
                                firstName={this.state.form.firsName || "First Name"} 
                                lastName={this.state.form.lastName || "Last Name"}
                                job={this.state.form.job || "Job"} 
                                twitter={this.state.form.twitter || "twitter"}
                                email={this.state.form.email || "email"}/>
                        </div>

                        <div className="col-6">
                            <h1>Edit Attendant</h1>
                            <BadgeForm 
                                onChange={this.handleChange}
                                formValues={this.state.form}
                                onSubmit={this.handleSubmit}
                                error={this.state.error}/>
                        </div>
                    </div>
                </div>

            
            </div>
        )
    }
}

export default BadgeEdit;