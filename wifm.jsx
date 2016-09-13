var ItemList = React.createClass({
  getInitialState: function(){
    return {data: this.props.data}
  },
  render: function() {
    console.log("ItemList.render()", this.props.data)
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
        <HeaderRow  data={data}
                    filterClickHandler={this.props.filterClickHandler}
                    searchClickHandler={this.props.searchClickHandler}
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
    return (
      <div className="item-container col-md-4 col-sm-12">
        <div className="centered bordered item">

          <table width="100%">
            <tbody>
              <tr>
                <td colSpan="3"><a href={this.props.url}><img src={this.props.imgUrl} className="product-image"/></a>
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="description"><a href={this.props.url}><h3>{this.props.description}</h3></a></td>
              </tr>
              <tr>
                <td colSpan="3"><h4>from {this.props.vendor}</h4></td>
              </tr>
              <tr>
                <td>Was £{this.props.initialPrice}</td>
                <td>Now £{this.props.price}</td>
                <td>Saving £{(this.props.initialPrice-this.props.price).toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <button type="button" id="btnBuy" className="btn btn-primary">
                    <span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span> Buy
                  </button>
                </td>
                <td>
                </td>
                <td>
                  <button type="button" id="btnDelete" className="btn btn-danger" onClick={() => this.props.clickHandler(this.props.id)}>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    );
  }
});



var HeaderRow = React.createClass({
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
  render: function() {
    return (
      <div>
        <a href="#"><div onClick={this.props.allClickHandler}>All ({this.props.data.length})</div></a>
        <a href="#"><div onClick={this.props.filterClickHandler}>Discounted ({this.getDiscounted()})</div></a>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search" id="txtSearchFilter"/>
          <button type="submit" className="btn btn-default" onClick={() => this.props.searchClickHandler(document.getElementById('txtSearchFilter').value)}><span className="glyphicon glyphicon-search"></span></button>
          </div>
      </div>
    );
  }
});

var ItemContainer = React.createClass({
  componentDidMount: function() {
    $(function() {
        $('.item').matchHeight();
    });
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
    console.log("newData:", newData)
    this.setState({data: newData});
  },

  showAllItems: function(){
    console.log("showAllItems");
    this.setState({data: this.props.data})
  },
  render: function() {
    console.log("ItemContainer.render()")

    return (
      <div>
        <h1>Your Watched Items</h1>
        <ItemList data={this.state.data}
                  clickHandler={this.handleClick}
                  filterClickHandler={this.filterDiscountedHandler}
                  searchClickHandler={this.searchClickHandler}
                  allClickHandler={this.showAllItems} />
      </div>
    );
  },

  getInitialState: function(){
    console.log("getInitialState")
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
