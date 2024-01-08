import React, { Component } from "react";
import InventoryService from "../services/InventoryService";

class CreateInventoryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nama_barang: "",
      jumlah: "",
      harga_satuan: "",
      lokasi: "",
      deskripsi: "",
    };

    this.changeNama = this.changeNama.bind(this);
    this.changeJumlahBarang = this.changeJumlahBarang.bind(this);
    this.changeHargaSatuan = this.changeHargaSatuan.bind(this);
    this.changeLokasi = this.changeLokasi.bind(this);
    this.changeDeskripsi = this.changeDeskripsi.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    this.cancel = this.cancel.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  componentDidMount() {
    if (this.state.id !== "_add") {
      InventoryService.getUserById(this.state.id).then((res) => {
        let barang = res.data;
        this.setState({
          nama_barang: barang.nama_barang,
          jumlah: barang.jumlah,
          harga_satuan: barang.harga_satuan,
          lokasi: barang.lokasi,
          deskripsi: barang.deskripsi,
        });
      });
    }
  }

  saveOrUpdateUser(e) {
    e.preventDefault();
    let barang = {
      nama_barang: this.state.nama_barang,
      jumlah: this.state.jumlah,
      harga_satuan: this.state.harga_satuan,
      lokasi: this.state.lokasi,
      deskripsi: this.state.deskripsi,
    };

    if (this.state.id === "_add") {
      InventoryService.createUser(barang).then((res) => {
        this.props.history.push("/inventories");
      });
    } else {
      InventoryService.updateUser(barang, this.state.id).then((res) => {
        this.props.history.push("/inventories");
      });
    }
  }

  changeNama(event) {
    this.setState({ nama_barang: event.target.value });
  }

  changeJumlahBarang(event) {
    this.setState({ jumlah: event.target.value });
  }

  changeHargaSatuan(event) {
    this.setState({ harga_satuan: event.target.value });
  }

  changeLokasi(event) {
    this.setState({ lokasi: event.target.value });
  }

  changeDeskripsi(event) {
    this.setState({ deskripsi: event.target.value });
  }

  cancel() {
    this.props.history.push("/inventories");
  }

  getTitle() {
    return this.state.id === "_add" ? (
      <h3 className="text-center">Add Inventory</h3>
    ) : (
      <h3 className="text-center">Update Inventory</h3>
    );
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          {this.getTitle()}
          <div className="row">
            <div className="col-md-12">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Nama Barang : </label>
                    <input
                      placeholder="Nama Barang"
                      name="nama_barang"
                      type="text"
                      className="form-control"
                      value={this.state.nama_barang}
                      onChange={this.changeNama}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jumlah : </label>
                    <input
                      placeholder="Jumlah Barang"
                      name="jumlah"
                      className="form-control"
                      type="number"
                      value={this.state.jumlah}
                      onChange={this.changeJumlahBarang}
                    />
                  </div>
                  <div className="form-group">
                    <label> Harga Satuan: </label>
                    <input
                      type="number"
                      placeholder="Harga Satuan"
                      name="harga_satuan"
                      className="form-control"
                      value={this.state.harga_satuan}
                      onChange={this.changeHargaSatuan}
                    />
                  </div>
                  <div className="form-group">
                    <label> Lokasi : </label>
                    <input
                      placeholder="Lokasi Disimpan"
                      name="lokasi"
                      className="form-control"
                      value={this.state.lokasi}
                      onChange={this.changeLokasi}
                    />
                  </div>
                  <div className="form-group">
                    <label> Deskripsi : </label>
                    <textarea
                      className="form-control"
                      onChange={this.changeDeskripsi}
                      name="deskripsi"
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="Deskripsi Barang"
                      value={this.state.deskripsi}
                    ></textarea>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateUser}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateInventoryComponent;
