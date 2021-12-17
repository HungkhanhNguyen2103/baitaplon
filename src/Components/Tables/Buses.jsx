import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";


export default function Buses(props) {
  const [toggleTask, setToggleTask] = useState(false);

  //listBuses
  const [listBuses, setListBuses] = useState([]);

  //listSave
  const [listBusesSave, setListBusesSave] = useState([]);

  //list lai xe
  const [listDrive,setListDrive] = useState([])

  //list lo trinh
  const [listRoute,setListRoute] = useState([])

  //list xe khach
  const [listBus,setListBus] = useState([])

   //isEdit
   const [isEdit,setIsEdit] = useState(false)

    //search
  const [searchKey,setSearchKey] = useState("")

  //keyword
  const [searchKeyWord,setSearchKeyWord] = useState("")


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

  //so ghe
  const [seats,setSeats] = useState()

  //id lai xe
  const [driver,setDriver] = useState({
    idlaixe : "",
    idphuxe : "",
    idlotrinh : "",
    idxekhach : ""
  })

  const handleAdd = () => {
    setToggleTask(!toggleTask);
  };

  //lay du lieu tu api
  useEffect(() => {
    //lay danh sach chuyen xe
    axios.get("http://localhost:8080/buses/all")
      .then((res) => {
        setListBuses(res.data);
        setListBusesSave(res.data)
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
        // console.log(res.data);
        //render so ghe
        const itemBus = res.data.find(item => item.idxekhach === Number(driver.idxekhach));
        if(itemBus !== 'undefined') setSeats(itemBus);
      })
      .catch((err) => {
        console.log(err);
      });
      props.handleToggleBuses()
       
  }, [driver.idxekhach]);

  //didmount truong input
  useEffect(() => {
    setField({
      ...field,
      laixe : listDrive.find(item => item.idtaixe === Number(driver.idlaixe)),
      phuxe : listDrive.find(item => item.idtaixe === Number(driver.idphuxe)),
      lotrinh : listRoute.find(item => item.idtuyenxe === Number(driver.idlotrinh)),
      xekhach : listBus.find(item => item.idxekhach === Number(driver.idxekhach)),
    })  
    // props.handleToggleBuses();
  }, [setField,driver,listDrive,listRoute,listBus])


  //lay truong trong input
  const actionField=(e)=>{
      const {name, value} = e.target;
      setField({
        ...field,
        [name] : value,
      })
      // console.log(e.target.value);
  }

  //lay id
  const actionDriver=(e)=>{
    const {name, value} = e.target;
    setDriver({
      ...driver,
      [name] : value,
    })
  }
  

  // add item
  const handleSubmit=(e)=>{
    e.preventDefault();
      // console.log(field);
      const maso  = listBus.every(item => item.masochuyen !== field.masochuyen)
      // const sonamsudung = Number(field.sonamsudung) % 1 === 0 
      if(field.masochuyen === '' || field.sokhach === '' || field.gia === '' || driver.idlaixe === '' ||
        driver.idphuxe === '' || driver.idlotrinh === '' || driver.idxekhach === '' )
         {
          swal("Nhập đầy đủ trường !")
         }
      else if(!maso && !isEdit){
        swal("Mã số tuyến đã sử dụng !")
      }   
      else if(driver.idlaixe === driver.idphuxe){
        swal("Lái xe và phụ xe là cùng một người !")
      }
    else {
        axios.post("http://localhost:8080/buses",field)
      .then(res =>{
        console.log(res);
      }) 
      .catch(err =>{
        console.log(err);
      }) 
      setToggleTask(!toggleTask)
      if(!isEdit){
        swal({
          title: "Thêm thành công !",
          icon: "success",
        });
      }
      else{
        swal({
          title: "Sửa thành công !",
          icon: "success",
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 1600);
      }     
  }

  //edit
  const handleEdit=(value)=>{
    setField(value)
    // setDriver(value)
    setDriver({
      idlaixe : value.laixe.idtaixe,
      idphuxe : value.phuxe.idtaixe,
      idlotrinh : value.lotrinh.idtuyenxe,
      idxekhach : value.xekhach.idxekhach
    })
    // console.log(value);
    setToggleTask(true)
    setIsEdit(true)
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
        setTimeout(() => {
          window.location.reload();
        }, 1600);
      }
    });
  };

  //handle Close
  const handleClose=()=>{
    setToggleTask(!toggleTask)
    setField({
      masochuyen : '',
      laixe : {},
      phuxe : {},
      lotrinh : {},
      xekhach : {},
      sokhach : '',
      gia : '',
    })
    setDriver({
      idlaixe : "",
      idphuxe : "",
      idlotrinh : "",
      idxekhach : ""
    })
    setToggleTask(!toggleTask);
  }

  const actionSelectSearch=(e)=>{
    setSearchKeyWord(e.target.value);
  }

  //Search
  const actionSearch=(e)=>{
    const value = e.target.value;
    const search = new RegExp (value ,'i');
    setSearchKey(search)
  }

  const handleSearch=()=>{ 
    // console.log(searchKeyWord);
    if(searchKeyWord === 'laixe') setListBuses(listBusesSave.filter(item=>item.laixe.ten.match(searchKey)))
    else if(searchKeyWord === 'phuxe') setListBuses(listBusesSave.filter(item=>item.phuxe.ten.match(searchKey)))
    else if(searchKeyWord === 'lotrinh') setListBuses(listBusesSave.filter(item=>item.lotrinh.lotrinh.match(searchKey)))
    else if(searchKeyWord === 'bienso') setListBuses(listBusesSave.filter(item=>item.xekhach.bienso.match(searchKey)))
    else {
      swal("Chọn trường cần tìm !")
    }
  }


  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Bảng cơ sở dữ liệu chuyến xe</h1>
        {/* Topbar Search */}
        <form className="d-none d-sm-inline-block form-inline ml-md-3 my-2 my-md-0 mw-100 col-5">
        <div className="input-group">
          <select  className="form-control small col-3"  onChange={actionSelectSearch}>
          <option className="d-none">Tìm theo: </option>
            <option value="laixe">Lái xe</option>
            <option value="phuxe">Phụ xe</option>
            <option value="lotrinh">Tuyến</option>
            <option value="bienso">Biển số</option>
          </select>
          <input type="text" className="form-control border-1 small" onChange={actionSearch}  placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={handleSearch}>
              <i className="fas fa-search fa-sm" />
            </button>
          </div>
        </div>
      </form>
        {/* Topbar Navbar */}
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
                  onChange={actionField}
                  value={field.masochuyen}
                  name="masochuyen"
                />
              </div>
              <div className="col">
              <select className="form-control" onChange={actionDriver} name="idlotrinh" value={driver.idlotrinh}>
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
                  type="number"
                  min='0'
                  max={seats !== undefined ? (`${seats.soghe - 2}`) : ('100') }
                  className="form-control"
                  placeholder="Số khách"
                  onChange={actionField}
                  value={field.sokhach}
                  name='sokhach'
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Giá vé"
                  onChange={actionField}
                  value={field.gia}
                  name='gia'
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col">
                <select className="form-control" onChange={actionDriver} name="idlaixe" value={driver.idlaixe}>
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
              <select className="form-control" onChange={actionDriver} name="idphuxe" value={driver.idphuxe}>
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
              <select className="form-control" onChange={actionDriver} name="idxekhach" value={driver.idxekhach}>
                  <option  className="d-none">Biển số</option>
                  {
                    listBus.length !== 0 ? (
                      listBus.map((item,key) =>
                      <option value={item.idxekhach} key={key}>{item.bienso}</option>
                      )
                    ) : (
                      <option>Không có giá trị</option>
                    )
                  }
                </select>
              </div>
              {
                seats !== undefined ? (
                  <div className="col-2 chair">Số ghế: {seats.soghe}</div>
                ) : (
                  <div className="col-2 chair">Số ghế: 0</div>
                )
              }
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
            onClick={handleClose}
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
                  <th>Số ghế còn lại</th>
                  <th>Giá vé (đ)</th>
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
                  <th>Số ghế còn lại</th>
                  <th>Giá vé (đ)</th>
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
                      <td>{item.xekhach.soghe - 2 - item.sokhach}</td>
                      <td>{item.gia}</td>
                      <td>
                        <input
                          className="btn btn-warning"
                          type="button"
                          defaultValue="Edit"
                          onClick={() => handleEdit(item)}
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
