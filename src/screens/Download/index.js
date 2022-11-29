import { Component } from 'react';
import {
  Button, ScrollView, Text, Image, View,
  Linking, ToastAndroid
} from 'react-native';
import { colors, url } from '../../init';
import axios from 'axios';
import styles from './styles';
import BookmarkButton from './bookmark';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const IMDB = ({ rating }) => (
  <View style={styles.imdb}>
    <Image
      style={{ width: 26, height: 26 }}
      tintColor={colors.images}
      source={require('../../../assets/star.png')}
    />
    <Text style={styles.imdbRating}>{rating}</Text>
  </View>
);

const LinkButton = ({ item }) => (
  <View style={styles.link}>
    <Button
      title={item.title}
      color={colors.loadingAndButtons}
      onPress={() => {
        Linking.openURL(item.url).catch(() => ToastAndroid.show(
          "Não foi possivel abrir o link!\nTalvez você não possua nenhum app compativel com Torrent",
          ToastAndroid.LONG
        ))
      }}
    />
  </View>
);

const Download = ({ data }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.base}>
          <Image style={styles.thumbnail} source={{ uri: data.thumbnail }} />
          <Text style={styles.title}>{data.title}</Text>
          {data.imdb > 0 ? (<IMDB rating={data.imdb} />) : null}
        </View>
        <Text style={styles.sinopse}>{data.sinopse}</Text>
        {data.links.map((v, k) => (<LinkButton item={v} key={k} />))}
      </View>
    </ScrollView>
  );
};

class DownloadScreen extends Component {
  state = {
    error: null,
    isLoading: true,
    result: null,
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getMovieInformations();
  }
  getMovieInformations() {
    this.setState({ isLoading: true });
    axios.get(
      `${url}/download/${this.props.route.params.url}`,
      { timeout: 10000 }
    ).then(response => {
      this.setState({
        isLoading: false,
        result: response.data,
      });
      this.props.navigation.setOptions({
        headerRight: () => (
          <BookmarkButton data={{
            ...response.data,
            url: this.props.route.params.url,
            links: undefined,
          }} />
        )
      });
    }).catch(error => {
      this.setState({
        isLoading: false,
        error: `Erro obtendo informações de download:\n${error.toString()}`
      });
    });
  }
  render() {
    return (
      <View style={styles.root}>
        {this.state.isLoading ? (
          <Loading msg="Buscando informações..." />
        ) : (
          this.state.error ? (
            <Error
              msg={this.state.error}
              onRetry={() => this.getMovieInformations()}
            />
          ) : (
            <Download data={this.state.result} />
          )
        )}
      </View>
    );
  }
}

export default DownloadScreen;