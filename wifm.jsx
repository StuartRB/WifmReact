var ItemList = React.createClass({
  getInitialState: function(){
    return {data: this.props.data}
  },
  render: function() {
    //console.log("ItemList.render()", this.props.data)
    if (this.props.data.length > 0){
    var commentNodes = this.props.data.map(function(item) {
      return (
            <Item clickHandler={this.props.clickHandler}
            vendor={item.vendor}
            key={item.id}
            id={item.id}
            description={item.description}
            price={item.price}
            initialPrice={item.initialPrice}
            imgUrl={item.imgUrl}
            url={item.url} />
      );
    }, this);
    return (
      <div>
        <HeaderRow  data={this.props.data}
                    filterClickHandler={this.props.filterClickHandler}
                    searchClickHandler={this.props.searchClickHandler}
                    filterVendorHandler={this.props.filterVendorHandler}
                    allClickHandler={this.props.allClickHandler}/>
        <div className="row centered">
          {commentNodes}
        </div>
      </div>
    );
  }
  else {
    return (<div>No items</div>);
  }
}
});

var Item = React.createClass({
  render: function() {

    var description = this.props.description.length < 30 ? this.props.description : this.props.description.substr(0,30) + " ...";

    return (
      <div>
        <div className="col-md-4 col-sm-12">
          <div className="centered bordered item">
            <div className="container-fluid">

              <div className="row">
                <div className="col-md-12"><a href={this.props.url}><img src={this.props.imgUrl} className="product-image"/></a></div>
              </div>
              <div className="row">
                <div className="col-md-12"><a href={this.props.url}><h4 className="pull-left">{description}</h4></a></div>
              </div>
              <div className="row">
                <div className="col-md-12"><h5 className="pull-left">from {this.props.vendor}</h5></div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div><h5>Was</h5></div>
                  <div><h4>£{this.props.initialPrice}</h4></div>
                </div>
                <div className="col-md-4">
                  <div><h5>Now</h5></div>
                  <div><h4>£{this.props.price}</h4></div>
                </div>
                <div className="col-md-4">
                  <div><h5>Saving</h5></div>
                  <div><h4>£{(this.props.initialPrice-this.props.price).toFixed(2)}</h4></div>
                </div>
              </div>

                <div className="col-md-4 col-sm-12">
                  <button type="button" id="btnDelete" className="btn btn-danger" onClick={() => this.props.clickHandler(this.props.id)}>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete
                  </button>
                </div>
                <div className="col-md-4 col-sm-12">
                  <button type="button" id="btnMoreInfo" className="btn btn-success">
                    <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Info
                  </button>
                </div>
                <div className="col-md-4 col-sm-12">
                  <button type="button" id="btnBuy" className="btn btn-primary">
                    <span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span> Buy
                  </button>
                </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
});



var HeaderRow = React.createClass({

  getInitialState: function(){
    return {data: this.props.data}
  },

  getDiscounted: function(){
    var discountedItems = this.props.data.filter(function(item) {
      return item.price < item.initialPrice
    })
    return discountedItems.length;
  },

  showAllItems: function(){
    console.log("plops");
    console.log(this.props.allClickHandler)
  },

  getDistinctVendors: function(){
    var vendors = []
    vendors = this.props.data.map(function(item){
        if(!vendors.includes(item.vendor)){
          return item.vendor;
        }
    })

    return vendors.sort()

  },

  render: function() {
    //console.log("HeaderRow render()", this.props.data, this.state.data)
    return (
      <div>
        <div className="row">
          <span className="col-md-1">Show</span>
          <a href="#"><div className="col-md-1" onClick={this.props.allClickHandler}>All ({this.state.data.length})</div></a>
          <a href="#"><div className="col-md-2" onClick={this.props.filterClickHandler}>Discounted ({this.getDiscounted()})</div></a>
        </div>
        <div className="row">
          <span className="col-md-1">Filter</span>
          {this.getDistinctVendors().map(function(vendor, index){
              return(
                <a href="#" key={index} onClick={() => {this.props.filterVendorHandler(vendor)}}>{vendor} | </a>
              )
           },this)
          }
        </div>
        <div className="row">
          <span className="col-md-1">Sort</span>
        </div>
        <div>
          <div className="form-group form-inline">
                <input type="text" className="form-control" placeholder="Search" id="txtSearchFilter"/>
                <button type="submit" className="btn btn-default form-control" onClick={() => this.props.searchClickHandler(document.getElementById('txtSearchFilter').value)}><span className="glyphicon glyphicon-search"></span></button>
          </div>
        </div>
      </div>
    );
  }
});

var ItemContainer = React.createClass({
  componentDidMount: function() {

    var vendors = []
    vendors = this.state.data.map(function(item){
        if(!vendors.includes(item.vendor)){
          return item.vendor;
        }
    })
  },

  handleClick: function(id){
    var newData = this.state.data;

    for (var i = 0; i < newData.length; i++) {
        if (newData[i].id === id) {
        newData.splice(i, 1);
        }
    }
    this.setState({data: newData});
  },

  filterVendorHandler: function(vendor){
    var newData = this.state.data.filter(function(item){
      return vendor == item.vendor
    });
    this.setState({data: newData});
    //console.log("vendor (" +vendor+ ") filtered data: ", newData.length, this.state.data.length)
  },

  filterDiscountedHandler: function(){
    var newData = this.state.data.filter(function(item){
      return item.initialPrice - item.price > 0
    });
    this.setState({data: newData});
  },

  searchClickHandler: function(searchString){
    var newData = this.props.data.filter(function(item){
      return  item.description.toUpperCase().includes(searchString.toUpperCase()) ||
              item.vendor.toUpperCase().includes(searchString.toUpperCase())
    });
    //console.log("newData:", newData)
    this.setState({data: newData});
  },

  showAllItems: function(){
    this.setState({data: this.props.data})
  },

  render: function() {
    //console.log("ItemContainer.render()")

    return (
      <div className="item-container">
        <h1>Your Watched Items</h1>
        <ItemList data={this.state.data}
                  clickHandler={this.handleClick}
                  filterClickHandler={this.filterDiscountedHandler}
                  filterVendorHandler={this.filterVendorHandler}
                  searchClickHandler={this.searchClickHandler}
                  allClickHandler={this.showAllItems} />
      </div>
    );
  },

  getInitialState: function(){
    //console.log("getInitialState")
    return {data: this.props.data, filteredData: this.props.data}
  }
});


var data = [
  {id: 1, vendor: "Amazon", description: "A Casio watch", initialPrice: "23.99", price: "23.99", url: "http://news.bbc.co.uk", imgUrl: "https://images-na.ssl-images-amazon.com/images/I/5175Cpqb7gL.jpg"},
  {id: 2, vendor: "Argos", description: "A small red projector", initialPrice: "5.99", price: "4.98", url: "http://news.bbc.co.uk", imgUrl: "http://argos.scene7.com/is/image/Argos/5805152_R_Z001A?$TMB$&wid=312&hei=312"},
  {id: 3, vendor: "Currys", description: "LG 49UH620V Smart 4k Ultra HD HDR 49inch LED TV", initialPrice: "549.99", price: "499.00", url: "http://news.bbc.co.uk", imgUrl: "http://brain-images.cdn.dixons.com/2/7/10144772/u_10144772.jpg"},
  {id: 4, vendor: "Tesco", description: "VonShef Coffee Pod Machine, compatible with Nespresso Capsules - 1250W - Red", initialPrice: "54.99", price: "39.00", url: "http://news.bbc.co.uk", imgUrl: "http://tesco.scene7.com/is/image/tesco/752-3583_PI_1000494MN?op_sharpen=1&id=B1ab40&fmt=jpg&fit=constrain,1&wid=480&hei=480&op_sharpen=1"},
  {id: 5, vendor: "Marks & Spencer", description: "4 Pack Pure Cotton Cool & Fresh™ Striped Briefs™", initialPrice: "18.00", price: "18.00", url: "http://www.marksandspencer.com/4-pack-pure-cotton-cool-and-fresh-striped-briefs-with-staynew/p/p22432323?image=SD_03_T14_6771S_F4_X_EC_90&color=NAVYMIX&prevPage=plp", imgUrl: "https://asset1.marksandspencer.com/is/image/mands/SD_03_T14_6771S_F4_X_EC_90?$PDP_PROD_IMAGE$&id=-aIqf3&fmt=jpg&fit=constrain,1&wid=400&hei=520"},
  {id: 6, vendor: "Game", description: "PS4 Pro 1TB", initialPrice: "349.00", price: "349.00", url: "http://www.game.co.uk/en/ps4-pro-1tb-1622072/?cm_re=home-_-Banner0-_-PlaystationMeeting", imgUrl: "http://img.game.co.uk/ml2/6/3/9/5/639578_ps4_b.png"}

];

ReactDOM.render(
  <div>
    <ItemContainer data={data} />
  </div>,
  document.getElementById('container')
);
