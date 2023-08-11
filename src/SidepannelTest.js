
import MetisMenu from '@metismenu/react';

// import 'metismenujs/dist/metismenujs.css';

import React from 'react';

import { Link } from 'react-router-dom';

 

const SidepannelTest = () => {

    return (

        <React.Fragment>

            <MetisMenu>

                <li>

                    <Link to="#" className="has-arrow">Elements</Link>

                    <ul>

                        <li><Link to="/">Text Box</Link></li>

                        <li><Link to="/checkBox">Check Box</Link></li>

                        <li><Link to="/radioButton">Radio Button</Link></li>

                        <li><Link to="/webTables">Web Tables</Link></li>

                        <li><Link to="/buttons">Buttons</Link></li>

                        <li><Link to="/links">Links</Link></li>

                        <li><Link to="/brokenLinks">Broken Links - Images</Link></li>

                        <li><Link to="/upload">Upload and Download</Link></li>

                        <li><Link to="/dynamic">Dynamic Properties</Link></li>

                        <li><Link to="/addorremoveelements">Add or Remove Elements</Link></li>

                        <li><Link to="/login">Login</Link></li>

                        <li><Link to = "/Disapear">Disappearing Elements</Link></li>

                        <li><Link to ="/DynamicControl">DynamicControls</Link> </li>

                        <li><Link to ="/Challengingdom">Challengingdom</Link></li>

                    </ul>

                </li>

                <li>

                    <Link to="#" className="has-arrow">Forms</Link>

                    <ul>

                        <li>

                            <Link to="/studentform" >Practice Form</Link>

                        </li>

                    </ul>

                </li>

                <li>

                    <Link to="#" className="has-arrow">Alerts,Frames & Windows</Link>

                    <ul>

                        <li>

                            <Link to="/browserwindows" >Browser Windows</Link>

                            <Link to="/alerts" >Alerts</Link>

                            <Link to="/frames" >Frames</Link>

                            <Link to="/nestedframes" >Nested Frames</Link>

                            <Link to="/dialogs" >Modal Dialogs</Link>

                        </li>

                    </ul>

                </li>

                <li>

                    <Link to="#" className="has-arrow">Widgets</Link>

                    <ul>

                        <li>

                            <Link to="/accordion" >Accordian</Link>

                            <Link to="/autocomplete" >Auto Complete</Link>

                            <Link to="/datetimepicker">Date Picker</Link>

                            <Link to="/slider" >Slider</Link>

                            <Link to="/progressbar" >Progress bar</Link>

                            <Link to="/tabs" >Tabs</Link>

                            <Link to="/tooltips" >Tool tips</Link>

                            <Link to="/menu" >Menu</Link>

                            <Link to="/selectmenu" >Select Menu</Link>

                        </li>

                    </ul>

                </li>

                <li>

                    <Link to="#" className="has-arrow">Interactions</Link>

                    <ul>

                        <li>

                            <Link to="/Sortable" >Sortable</Link>

                            <Link to="/Selectable" >Selectable</Link>

                            <Link to="/Resizable" >Resizable</Link>

                            <Link to="/Droppable" >Droppable</Link>

                            <Link to="/Dragabble" >Draggable</Link>

                        </li>

                    </ul>

                </li>

            </MetisMenu>

        </React.Fragment>

    )

}


export default SidepannelTest