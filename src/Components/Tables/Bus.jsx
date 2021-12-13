export default function Bus() {
  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Bảng cơ sở dữ liệu xe khách</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">DataTables Bus</h6>
          <button className="btn btn-success">
            <a>Add item</a>
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>Biển số</th>
                  <th>Màu xe</th>
                  <th>Hãng sản xuất</th>
                  <th>Model</th>
                  <th>Số ghế</th>
                  <th>Năm sử dụng</th>
                  <th>Ngày bảo dưỡng</th>
                  <th></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Biển số</th>
                  <th>Màu xe</th>
                  <th>Hãng sản xuất</th>
                  <th>Model</th>
                  <th>Số ghế</th>
                  <th>Năm sử dụng</th>
                  <th>Ngày bảo dưỡng</th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>ad</td>
                  <td>ad</td>
                  <td>ad</td>
                  <td>ad</td>
                  <td>ad</td>
                  <td>ad</td>
                  <td>ad</td>
                  <td className=" d-flex justify-content-center">
                    <input
                      className="btn btn-warning"
                      type="button"
                      value="Edit"
                      style={{ marginRight: "1rem" }}
                    />
                    <input
                      className="btn btn-danger"
                      type="submit"
                      value="Delete"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
