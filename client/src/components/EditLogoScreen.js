import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";
import Rnd from 'react-rnd';


const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            texts
            color
            fontSize
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            height
            width
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!,
        $height: Int!,
        $width: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                padding: $padding,
                margin: $margin,
                height: $height,
                width: $width,) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor(props){
        super(props)

        this.state = {
            renderText: "",
            renderTexts: [],
            renderColor: "",
            renderBackgroundColor: "",
            renderBorderColor: "",
            renderBorderWidth: "",
            renderBorderRadius: "",
            renderFontSize: "",
            renderPadding: "",
            renderMargin: "",
            renderHeight: "",
            renderWidth: ""
        }
    }

    addTextChange = (e) => {
        this.setState(state => {
            const list = state.renderTexts.concat(state.value);

            return list;
        })
    }

    addImage = () => {
        var url = document.getElementById('imageURL').value;
        var img = document.createElement('img');
        img.src = url;
        var logoview = document.getElementById('logoview');
        logoview.appendChild(img);

    }

    render() {
        let text, texts, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin, height, width;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body row">                                            
                                            <form className="col-6" onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, texts: texts.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value,
                                                                            borderWidth: parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value),
                                                                            padding: parseInt(padding.value), margin: parseInt(margin.value), height: parseInt(height.value), width: parseInt(width.value) } });
                                                text.value = "";
                                                texts.value = [];
                                                color.value = "";
                                                fontSize.value = "";
                                                backgroundColor.value = "";
                                                borderColor.value = "";
                                                borderWidth.value = "";
                                                borderRadius.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                                height.value = "";
                                                width.value = "";
                                            }}>
                                                <div className="form-group col-8">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} onChange={() => this.setState({renderText: text.value})} placeholder={data.logo.text} defaultValue={data.logo.text} />
                                                </div>
                                                <div className="form-group col-8">
                                                <label htmlFor="texts">Add Text:</label>
                                                    <input type="text" className="form-control" name="texts" ref={node => {
                                                        texts = node;
                                                    }} onChange ={this.addTextChange}/>
                                                <button type="button" className="btn btn-primary">Add Text</button>
                                                </div>
                                                <div className="form-group col-8">
                                                <form>
                                                    Image URL:
                                                    <input type="text" id="imageURL" className="form-control" />
                                                    <button type="button" className="btn btn-primary" onClick={this.addImage}>Add Image</button>
                                                </form>
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }}onChange={() => this.setState({renderColor: color.value})} placeholder={data.logo.color} defaultValue={data.logo.color} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} onChange={() => this.setState({renderBackgroundColor: backgroundColor.value})} placeholder={data.logo.backgroundColor} defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} onChange={() => this.setState({renderBorderColor: borderColor.value})} placeholder={data.logo.color} defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} onChange={() => this.setState({renderFontSize: parseInt(fontSize.value)})} placeholder={data.logo.fontSize} defaultValue={data.logo.fontSize} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} onChange={() => this.setState({renderBorderWidth: parseInt(borderWidth.value)})} placeholder={data.logo.borderWidth} defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} onChange={() => this.setState({renderBorderRadius: parseInt(borderRadius.value)})} placeholder={data.logo.borderRadius} defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} onChange={() => this.setState({renderPadding: parseInt(padding.value)})} placeholder={data.logo.padding} defaultValue={data.logo.padding} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} onChange={() => this.setState({renderMargin: parseInt(margin.value)})} placeholder={data.logo.margin} defaultValue={data.logo.margin} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="height">Height:</label>
                                                    <input type="number" onInput={()=>{height.value = clamp(height.value, 0, 900);}} className="form-control" name="height" ref={node => {
                                                        height = node;
                                                    }} onChange={() => this.setState({renderHeight: parseInt(height.value)})} placeholder={data.logo.height} defaultValue={data.logo.height} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="width">Width:</label>
                                                    <input type="number" onInput={()=>{width.value = clamp(width.value, 0, 570);}} className="form-control" name="width" ref={node => {
                                                        width = node;
                                                    }} onChange={() => this.setState({renderWidth: parseInt(width.value)})} placeholder={data.logo.width} defaultValue={data.logo.width} />
                                                </div>
                                                <button type="submit" className="btn btn-success">Save Logo</button>
                                            </form>
                                            <div className="col-6" id="logoview">
                                                <span style={{
                                                    display: "inline-block",
                                                    color: this.state.renderColor ? this.state.renderColor : data.logo.color,
                                                    backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : data.logo.backgroundColor,
                                                    borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : data.logo.borderColor,
                                                    borderStyle: "solid",
                                                    fontSize: (this.state.renderFontSize ? this.state.renderFontSize : data.logo.fontSize) + "pt",
                                                    borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : data.logo.borderWidth) + "px",
                                                    borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : data.logo.borderRadius) + "px",
                                                    padding: (this.state.renderPadding ? this.state.renderPadding : data.logo.padding) + "px",
                                                    margin: (this.state.renderMargin ? this.state.renderMargin : data.logo.margin) + "px",
                                                    height: (this.state.renderHeight ? this.state.renderHeight : data.logo.height),
                                                    width: (this.state.renderWidth ? this.state.renderWidth: data.logo.width),
                                                }}>{this.state.renderText ? this.state.renderText :  data.logo.text}
                                                {this.state.renderTexts ? this.state.renderTexts: data.logo.texts}</span>
                                                <ul>
                                                    {this.state.renderTexts.map(item => (
                                                    <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;