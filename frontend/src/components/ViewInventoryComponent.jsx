import React, { Component } from "react";
import InventoryService from "../services/InventoryService";

class ViewInventoryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    InventoryService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  cancel = () => {
    this.props.history.push("/inventories");
  };
  editUser(id){
    this.props.history.push(`/add-user/${id}`);
}

  render() {
    return (
      <div>
        <br />
        <h3 className="text-center">View User Details</h3>
        <div className="card col-md-12">
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Id</th>
                <td>{this.state.user.id}</td>
              </tr>
              <tr>
                <th scope="row">Nama Barang</th>
                <td>{this.state.user.nama_barang}</td>
              </tr>
              <tr>
                <th scope="row">Jumlah</th>
                <td>{this.state.user.jumlah}</td>
              </tr>
              <tr>
                <th scope="row">Harga Satuan</th>
                <td>{this.state.user.harga_satuan}</td>
              </tr>
              <tr>
                <th scope="row">Lokasi</th>
                <td>{this.state.user.lokasi}</td>
              </tr>
              <tr>
                <th scope="row">Detail Barang</th>
                <td>{this.state.user.deskripsi}</td>
              </tr>
            </tbody>
          </table>
        </div>
       <div className='col-md-12'style={{ textAlign :'right'}}>
       <button onClick={ () => 
                          this.editUser(this.state.user.id)} 
                               className="btn btn-info mr-2">Update 
                                 </button>
        
          <button
            className="btn btn-danger"
            onClick={this.cancel}
          >
            Cancel
          </button>
       </div>
      </div>
    );
  }
}

export default ViewInventoryComponent;