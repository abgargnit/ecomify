import { Helmet } from "react-helmet-async"


const Meta = ({title,description,keyword,}) => {
  return (
    <Helmet>
        <title>{title}
        </title>
        <meta name="description" content={description}/>
        <meta name="keyword" content={keyword}/>
    </Helmet>
  );
};

Meta.defaultProps = {
    title:'ecommerce project',
    description: 'Products,Products and Products...',
    keyword: 'happy shopping'
}

export default Meta