import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function Buses() {
  const [toggleTask, setToggleTask] = useState(false);

  //listBuses
  const [listBuses, setListBuses] = useState([]);

  //list lai xe
  const [listDrive,setListDrive] = useState([])

  //list lo trinh
  const [listRoute,setListRoute] = useState([])

  //list xe khach
  const [listBus,setListBus] = useState([])


  //field input
  const [field,setField] = useState({
    masochuyen : '',
    laixe : {},
    phuxe : {},
    lotrinh : {},
    xekhach : {},
    sokhach : '',
    gia : '',
  })

  //id lai xe
  const [driver,setDriver] = useState({
    idlaixe : "",
    idphuxe : "",
    idlotrinh : "",
    idxekhach : "",
  })

  const handleAdd = () => {
    setToggleTask(!toggleTask);
  };

  //lay du lieu tu api
  useEffect(() => {
    //lay danh sach chuyen xe
    axios
      .get("http://localhost:8080/buses/all")
      .then((res) => {
        setListBuses(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      // lay danh sach tai xe
      axios
      .get("http://localhost:8080/driver/all")
      .then((res) => {
        setListDrive(res.data)
      })
      .catch((err) => {
        console.log(err);
      });  
      //lay danh sach tuyen duong
      axios
      .get("http://localhost:8080/route/all")
      .then((res) => {
        setListRoute(res.data)
      })
      .catch((err) => {
        console.log(err);
      });  
      //lay danh sach bus
      axios
      .get("http://localhost:8080/bus/all")
      .then((res) => {
        setListBus(res.data)
      })
      .catch((err) => {
        console.log(err);
      });  
  }, []);


  //lay truong trong input
  const actionAddItem=(e)=>{
      const {name, value} = e.target;
      setField({
        ...field,
        [name] : value,
      })
      setDriver({
        ...driver,
        [name] : value,
      })
  }

  // add item
  const handleSubmit=(e)=>{
    e.preventDefault();
    setField({
      masochuyen : field.masochuyen,
      laixe : listDrive.find(item => item.idtaixe === Number(driver.idlaixe)),
      // phuxe : listAccessories.find(item => item.idtaixe === Number(driver.idphuxe)),
      lotrinh : listRoute.find(item => item.idtuyenxe === Number(driver.idlotrinh)),
      // lotrinh : listDrive.find(item => item.idtaixe === Number(driver.idlaixe)),
      sokhach : field.sokhach,
      gia : field.gia,
      // phuxe : 
    })
    console.log(field);
  }

  //delete item
  const handleDelete = (value) => {
    swal({
      title: `Bạn có muốn xóa lộ trình ${value.lotrinh.lotrinh}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8080/buses/${value.idchuyenxe}`, {
            data: value,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        swal("Đã xóa thành công!", {
          icon: "success",
        });
      }
    });
  };


  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Bảng cơ sở dữ liệu chuyến xe</h1>
      </div>
      <div
        className={
          !toggleTask ? "card shadow mb-4 close-form" : "card shadow mb-4 show"
        }
      >
        <div className="card-header py-3 d-flex justify-content-center ">
          <form className="form w-100" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mã số"
                  onChange={actionAddItem}
                  value={field.masochuyen}
                  name="masochuyen"
                />
              </div>
              <div className="col">
              <select className="form-control" onChange={actionAddItem} name="idlotrinh" value={driver.idlotrinh}>
                  <option  className="d-none">Tuyến</option>
                  {
                    listRoute.length !== 0 ? (
                      listRoute.map((item,key) =>
                      <option value={item.idtuyenxe} key={key}>{item.lotrinh}</option>
                      )
                    ) : (
                      <option>Không có giá trị</option>
                    )
                  }
                </select>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Số khách"
                  onChange={actionAddItem}
                  value={field.sokhach}
                  name='sokhach'
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col">
                <select className="form-control" onChange={actionAddItem} name="idlaixe" value={driver.idlaixe}>
                  <option  className="d-none">Lái xe</option>
                  {
                    listDrive.length !== 0 ? (
                      listDrive.map((item,key) =>
                      <option value={item.idtaixe} key={key}>{item.ten}</option>
                      )
                    ) : (
                      <option>Không có giá trị</option>
                    )
                  }
                </select>
              </div>
              
              <div className="col">
              <select className="form-control" onChange={actionAddItem} name="idphuxe" value={driver.idphuxe}>
                  <option  className="d-none">Phụ xe</option>
                  {
                    listDrive.length !== 0 ? (
                      listDrive.map((item,key) =>
                      <option value={item.idtaixe} key={key}>{item.ten}</option>
                      )
                    ) : (
                      <option>Không có giá trị</option>
                    )
                  }
                </select>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Giá vé"
                  onChange={actionAddItem}
                  value={field.gia}
                  name='gia'
                />
              </div>
              <div className="col">
                <input
                  type="Submit"
                  className="btn btn-success"
                  defaultValue="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          !toggleTask
            ? "card shadow mb-4 animation"
            : "card shadow mb-4 table-show"
        }
      >
        <div className="card-header py-3 d-flex justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            DataTables Buses
          </h6>
          <button
            className={!toggleTask ? "btn btn-info" : "d-none"}
            onClick={handleAdd}
          >
            Add item
          </button>
          <button
            className={toggleTask ? "btn btn-secondary" : "d-none"}
            onClick={handleAdd}
          >
            Close task
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Mã số</th>
                  <th>Tuyến</th>
                  <th>Lái xe</th>
                  <th>Phụ xe</th>
                  <th>Biển số xe</th>
                  <th>Số khách</th>
                  <th>Giá vé</th>
                  <th></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Mã số</th>
                  <th>Tuyến</th>
                  <th>Lái xe</th>
                  <th>Phụ xe</th>
                  <th>Biển số xe</th>
                  <th>Số khách</th>
                  <th>Giá vé</th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>
                {listBuses.length !== 0 ? (
                  listBuses.map((item, key) => (
                    <tr key={key}>
                      <td>{item.masochuyen}</td>
                      <td>{item.lotrinh.lotrinh}</td>
                      <td>{item.laixe.ten}</td>
                      <td>{item.phuxe.ten}</td>
                      <td>{item.xekhach.bienso}</td>
                      <td>{item.sokhach}</td>
                      <td>{item.gia}</td>
                      <td>
                        <input
                          className="btn btn-warning"
                          type="button"
                          defaultValue="Edit"
                          style={{ marginRight: "1rem" }}
                        />
                        <input
                          className="btn btn-danger"
                          type="button"
                          onClick={() => handleDelete(item)}
                          defaultValue="Delete"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No item in table</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
