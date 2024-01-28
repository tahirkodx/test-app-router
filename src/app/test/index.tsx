import React from "react";
import UserAPI from "@/custom/utils/actions/user";
import { useEffect } from "react";
import { ProductAPI } from "@/custom/utils/actions";
import Head from "next/head";
import { 
  FacebookShareButton, 
  FacebookIcon, 
  PinterestShareButton, 
  PinterestIcon, 
  RedditShareButton, 
  RedditIcon, 
  WhatsappShareButton, 
  WhatsappIcon, 
  LinkedinShareButton, 
  LinkedinIcon, 
} from 'next-share'; 
var _ = require("lodash");

// This gets called on every request
export async function getServerSideProps(context) {
    // Fetch data from external API
    // const res = await fetch(`https://.../data`)
    let data: any = {};
    const prods = await ProductAPI.getPCById({ ProductId: 18156 });
          if (
            prods !== null &&
            prods !== undefined &&
            prods?.result !== undefined &&
            prods?.result?.length > 0
          ) {
            data = prods.result[0];
            data = {
              ...data,
              ProductUrl: `https://www.main.evetech.co.za/${_.replace(
                _.toLower(data.Title),
                new RegExp(" ", "g"),
                "-"
              ).trim()}/best-pc-deal/${data.ProductID}.aspx`
            }
          }
    // const data = "Tahir Amjad"; // await res.json()
   
    // Pass data to the page via props
    return { props: { product: data } }
  }

const test = (props: any)=>{
    console.log(props)
    // const testfunction = async()=>{
    //     const validityData = await UserAPI.getValidate();
    //     console.log("validaity data ",validityData);
    // }

   /*  useEffect(()=>{
        testfunction();
    },[]) 
 */
    return (<>

        {/* <FacebookShare url={'https://main.evetech.co.za/test'} quote={"Github hai ye bhai"} /> */}
        <div> 
      <h1>Social Share - GeeksforGeeks</h1> 
      <FacebookShareButton 
        url={'https://main.evetech.co.za/test'} > 
        <FacebookIcon size={32} round /> 
      </FacebookShareButton>
      <RedditShareButton 
        url={'https://main.evetech.co.za/test'} > 
        <RedditIcon size={32} round /> 
      </RedditShareButton> 
      <WhatsappShareButton 
        url={'https://main.evetech.co.za/test'} > 
        <WhatsappIcon size={32} round /> 
      </WhatsappShareButton> 
      <LinkedinShareButton 
        url={'https://main.evetech.co.za/test'} > 
        <LinkedinIcon size={32} round /> 
      </LinkedinShareButton> 
    </div> 
        Testing Page Update
    </>);
}

export default test;