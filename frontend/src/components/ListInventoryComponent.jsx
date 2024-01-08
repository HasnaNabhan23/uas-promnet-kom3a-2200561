import React, { Component } from 'react'
import InventoryService from '../services/InventoryService'

class ListInventoryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                inventory: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
        this.deleteInventory = this.deleteInventory.bind(this);
    }

    deleteInventory(id){
        InventoryService.deleteInventory(id).then( res => {
            this.setState({inventory: 
                this.state.inventory.
                filter(barang => barang.id !== id)});
        });
    }
    viewUser(id){
        console.log(id);
        this.props.history.push(`/view-inventory/${id}`);
    }
    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }

    componentDidMount(){
        InventoryService.getInventory().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-user/_add');
            }
            this.setState({ inventory: res.data});
        });
    }

    addUser(){
        this.props.history.push('/add-user/_add');
    }

    

    render() {
        return (
            <div>
                 <h2 className="text-center">
                     </h2>
                     <br></br><br />
                 <div className = "row">
                    <button className="btn btn-primary"
                     onClick={this.addUser}> Add Barang</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className 
                        = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>Nama Barang</th>
                                    <th>Jumlah</th>
                                    <th>Harga Satuan</th>
                                    <th>Lokasi</th>
                                    <th>Deskripsi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.inventory.map(
                                        barang => 
                                        <tr key = {barang.id}>
                                            <td>
                                                {barang.nama_barang}
                                            </td>
                                            <td>
                                                {barang.jumlah}
                                            </td>
                                            <td>
                                                {barang.harga_satuan}
                                            </td>
                                            <td>
                                                {barang.lokasi}
                                            </td>
                                            <td width={350}>
                                                {barang.deskripsi}
                                            </td>
                                             <td>
                      <button onClick={ () => 
                          this.editUser(barang.id)} 
                               className="btn btn-info">Update 
                                 </button>
                       <button style={{marginLeft: "10px"}}
                          onClick={ () => this.deleteInventory(barang.id)} 
                             className="btn btn-danger">Delete 
                                 </button>
                       <button style={{marginLeft: "10px"}} 
                           onClick={ () => this.viewUser(barang.id)}
                              className="btn btn-info">View 
                                  </button>
                                    </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
            </div>
        )
    }
}


export default ListInventoryComponent
