
// var logo = new Vivus('logo', {
//         duration: 200,
//         file: 'images/timrangel-logo.svg'

//     }, function() {
//     console.log("logo complete");
// });



var introVideo = document.getElementById('video-onphone');
introVideo.addEventListener("ended", function() {
    console.log("video complete");

});
introVideo.play();



/**
 * React Code
 */

var Insta = React.createClass({
    render : function() {
        return (
            <a className="insta" href={this.props.url}><img src={this.props.src}/><div className="cover"/></a>
        );
    }
});

var SocialPhotos = React.createClass({

    getInitialState : function() {
        return {
            photos : []
        }
    },
    componentDidMount : function() {
        var self = this;
        superagent
            .get('http://tim.rangelworks.com/php/instagram.php')
            .end(function(err, res) {
                if(err) {
                    console.error(err);
                    // TODO pull images from some cached set
                }
                console.log(res);
                if(res) {
                    var images = res.body;
                    var photos = [];
                    for (var i = 0; i < 10; i++) {
                        var obj = images[i];
                        // TODO filter by tag
                        photos.push(<Insta key={obj.id} url={obj.link} src={obj.images.low_resolution.url} />);
                    }
                    self.setState({photos : photos});
                }
            });
    },

    render : function() {
        var photos = this.state.photos;
        return (<div className="">
            {photos}
            </div>);
    }
});


ReactDOM.render(
    <SocialPhotos />,
    document.getElementById('social-photos')
);