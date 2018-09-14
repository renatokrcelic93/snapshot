import React, { Component } from "react";
import Fonts from "../../utility/Fonts";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: {
    vomo_green,
    vomo_blgrey,
    vomo_black,
    vomo_blue,
    vomo_grey,
    vomo_red,
    vomo_white,
    vomo_light_bg
  }
} = globalStyles;

class Styles extends Component {
  componentDidMount() {
    Fonts();
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
        <style jsx global>{`
          html {
            font-size: 18px;
          }

          body {
            margin: 0;
            background: white;
            font-family: "Quicksand", sans-serif;
            color: #5c666f;
          }

          input:focus,
          select:focus,
          textarea:focus,
          button:focus {
            outline: none;
          }

          h4 {
            margin-top: 0px;
            margin-bottom: 10px;
          }
          p {
            font-size: ${fontSizes.m};
            line-height: 1.5625rem;
            margin-top: 0px;
            margin-bottom: 10px;
          }
          @media (max-width: 768px) {
            #project_details-updates_container p {
              color: ${vomo_blgrey};
              font-size: ${fontSizes.s};
              line-height: ${lineHeights.s};
              margin-bottom: 0;
            }
            #project_details-updates_container h4 {
              color: #000;
              font-size: ${fontSizes.s};
              margin-bottom: 3px;
            }
            #project_details-updates_container ul {
              font-size: ${fontSizes.s};
            }
            #project_details-updates_container .margin-top-30 {
              margin-top: 20px;
            }
            #project_details-updates_container .margin-top-30 .container {
              padding-left: 0;
              padding-right: 0;
            }
            #project_details-updates_container .margin-bottom-25 {
              margin-bottom: 20px;
            }
          }

          .vomo-button-disabled {
            background-color: #bdbdbd;
            display: inline-block;
            width: auto;
            border-radius: 3px;
            color: #fff;
            text-align: center;
            position: relative;
            margin-right: 1px;
            margin-left: 1px;
            padding: 10px 10px;
            -webkit-transition: background-color 200ms ease;
            transition: background-color 200ms ease;
            font-size: ${fontSizes.xs};
            line-height: ${lineHeights.s};
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: auto;
          }
          .vomo-button {
            display: inline-block;
            border-radius: 5px;
            background-color: ${vomo_green};
            color: #fff;
            text-align: center;
            position: relative;
            margin-right: 1px;
            margin-left: 1px;
            padding: 16px 20px;
            -webkit-transition: background-color 200ms ease;
            transition: background-color 200ms ease;
            font-size: ${fontSizes.xs};
            line-height: ${lineHeights.s};
            font-weight: 400;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
          }

          .pointer {
            cursor: pointer;
          }

          .font-xxs {
            font-size: ${fontSizes.xxs};
          }
          .font-xs {
            font-size: ${fontSizes.xs};
          }
          .font-s {
            font-size: ${fontSizes.s};
          }
          .font-m {
            font-size: ${fontSizes.m};
          }
          .font-l {
            font-size: ${fontSizes.l};
          }
          .font-xl {
            font-size: ${fontSizes.xl};
          }
          .font-xxl {
            font-size: ${fontSizes.xxl};
          }
          .font-xxxl {
            font-size: ${fontSizes.xxxl};
          }

          .black {
            color: ${vomo_black};
          }

          .blue {
            color: ${vomo_blue};
          }
          .green {
            color: ${vomo_green} !important;
          }

          .vomo-grey {
            color: ${vomo_grey};
          }
          .vomo-red {
            color: ${vomo_red};
          }

          .white {
            color: ${vomo_white} !important;
          }

          .normal {
            font-weight: 400;
          }

          .bold {
            font-weight: 700;
          }
          .semi-bold {
            font-weight: 500;
          }

          .light {
            font-weight: 300;
          }

          .bg-white {
            background: ${vomo_white};
          }
          .bg-blue {
            background: ${vomo_blue};
          }
          .bg-light {
            background: ${vomo_light_bg};
          }

          .bg-green {
            background: ${vomo_green} !important;
          }

          .default-color {
            color: #5c666f;
          }

          .text-center {
            text-align: center;
          }
          .text-left {
            text-align: left;
          }
          .text-right {
            text-align: right;
          }

          .margin-top-60 {
            margin-top: 60px;
          }
          .margin-top-40 {
            margin-top: 40px;
          }
          .margin-top-30 {
            margin-top: 30px;
          }
          .margin-top-15 {
            margin-top: 15px;
          }
          .margin-top-10 {
            margin-top: 10px;
          }
          .margin-top-8 {
            margin-top: 8px;
          }
          .margin-top-5 {
            margin-top: 5px;
          }
          .margin-bottom-5 {
            margin-bottom: 5px;
          }
          .margin-bottom-8 {
            margin-bottom: 8px;
          }
          .margin-bottom-15 {
            margin-bottom: 8px;
          }
          .margin-bottom-25 {
            margin-bottom: 25px;
          }
          .margin-bottom-30 {
            margin-bottom: 30px;
          }
          .margin-bottom-35 {
            margin-bottom: 35px;
          }
          .margin-bottom-50 {
            margin-bottom: 50px;
          }
          .margin-bottom-60 {
            margin-bottom: 60px;
          }
          .padding-top-60 {
            padding-top: 60px;
          }
          .padding-top-20 {
            padding-top: 20px;
          }
          .padding-top-30 {
            padding-top: 30px;
          }
          .padding-top-15 {
            padding-top: 15px;
          }
          .padding-top-8 {
            padding-top: 8px;
          }
          .padding-top-6 {
            padding-top: 6px;
          }
          .padding-top-4 {
            padding-top: 4px;
          }
          .padding-bottom-4 {
            padding-bottom: 4px;
          }
          .padding-bottom-30 {
            padding-bottom: 30px;
          }
          .padding-bottom-20 {
            padding-bottom: 20px;
          }
          .padding-bottom-15 {
            padding-bottom: 15px;
          }
          .padding-bottom-8 {
            padding-bottom: 8px;
          }
          .margin-left-30 {
            margin-left: 30px;
          }

          .text-xs-left {
            text-align: left !important;
          }

          .text-xs-right {
            text-align: right !important;
          }

          .text-xs-center {
            text-align: center !important;
          }

          .text-xs-justify {
            text-align: justify !important;
          }

          @media (min-width: 576px) {
            .text-sm-left {
              text-align: left !important;
            }

            .text-sm-right {
              text-align: right !important;
            }

            .text-sm-center {
              text-align: center !important;
            }

            .text-sm-justify {
              text-align: justify !important;
            }
          }

          @media (min-width: 768px) {
            .text-md-left {
              text-align: left !important;
            }

            .text-md-right {
              text-align: right !important;
            }

            .text-md-center {
              text-align: center !important;
            }

            .text-md-justify {
              text-align: justify !important;
            }
          }

          @media (min-width: 992px) {
            .text-lg-left {
              text-align: left !important;
            }

            .text-lg-right {
              text-align: right !important;
            }

            .text-lg-center {
              text-align: center !important;
            }

            .text-lg-justify {
              text-align: justify !important;
            }
          }

          @media (min-width: 1200px) {
            .text-xl-left {
              text-align: left !important;
            }

            .text-xl-right {
              text-align: right !important;
            }

            .text-xl-center {
              text-align: center !important;
            }

            .text-xl-justify {
              text-align: justify !important;
            }
          }

          @-ms-viewport {
            width: device-width;
          }

          html {
            box-sizing: border-box;
            -ms-overflow-style: scrollbar;
          }

          *,
          *::before,
          *::after {
            box-sizing: inherit;
          }

          .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }

          .hub.container-fluid {
            padding-left: 0;
            padding-right: 0;
          }

          @media (min-width: 576px) {
            .container {
              max-width: 540px;
            }
          }

          @media (min-width: 768px) {
            .container {
              max-width: 720px;
            }
          }

          @media (min-width: 992px) {
            .container {
              max-width: 960px;
            }
          }

          @media (min-width: 1200px) {
            .container {
              max-width: 1140px;
            }
          }

          .container-fluid {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }
          @media (max-width: 576px) {
            .hub.container-fluid {
              margin-bottom: 15px;
              padding-left: 0;
              padding-right: 0;
            }
          }

          .row {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          }

          .no-gutters {
            margin-right: 0;
            margin-left: 0;
            padding-left: 0;
            padding-right: 0;
          }

          .no-gutters > .col,
          .no-gutters > [class*="col-"] {
            padding-right: 0;
            padding-left: 0;
          }

          .col-1,
          .col-2,
          .col-3,
          .col-4,
          .col-5,
          .col-6,
          .col-7,
          .col-8,
          .col-9,
          .col-10,
          .col-11,
          .col-12,
          .col,
          .col-auto,
          .col-sm-1,
          .col-sm-2,
          .col-sm-3,
          .col-sm-4,
          .col-sm-5,
          .col-sm-6,
          .col-sm-7,
          .col-sm-8,
          .col-sm-9,
          .col-sm-10,
          .col-sm-11,
          .col-sm-12,
          .col-sm,
          .col-sm-auto,
          .col-md-1,
          .col-md-2,
          .col-md-3,
          .col-md-4,
          .col-md-5,
          .col-md-6,
          .col-md-7,
          .col-md-8,
          .col-md-9,
          .col-md-10,
          .col-md-11,
          .col-md-12,
          .col-md,
          .col-md-auto,
          .col-lg-1,
          .col-lg-2,
          .col-lg-3,
          .col-lg-4,
          .col-lg-5,
          .col-lg-6,
          .col-lg-7,
          .col-lg-8,
          .col-lg-9,
          .col-lg-10,
          .col-lg-11,
          .col-lg-12,
          .col-lg,
          .col-lg-auto,
          .col-xl-1,
          .col-xl-2,
          .col-xl-3,
          .col-xl-4,
          .col-xl-5,
          .col-xl-6,
          .col-xl-7,
          .col-xl-8,
          .col-xl-9,
          .col-xl-10,
          .col-xl-11,
          .col-xl-12,
          .col-xl,
          .col-xl-auto {
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
          }

          .col {
            -ms-flex-preferred-size: 0;
            flex-basis: 0;
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            max-width: 100%;
          }

          .col-auto {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 auto;
            flex: 0 0 auto;
            width: auto;
            max-width: none;
          }

          .col-1 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 8.333333%;
            flex: 0 0 8.333333%;
            max-width: 8.333333%;
          }

          .col-2 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 16.666667%;
            flex: 0 0 16.666667%;
            max-width: 16.666667%;
          }

          .col-3 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 25%;
            flex: 0 0 25%;
            max-width: 25%;
          }

          .col-4 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 33.333333%;
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
          }

          .col-5 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 41.666667%;
            flex: 0 0 41.666667%;
            max-width: 41.666667%;
          }

          .col-6 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 50%;
            flex: 0 0 50%;
            max-width: 50%;
          }

          .col-7 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 58.333333%;
            flex: 0 0 58.333333%;
            max-width: 58.333333%;
          }

          .col-8 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 66.666667%;
            flex: 0 0 66.666667%;
            max-width: 66.666667%;
          }

          .col-9 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 75%;
            flex: 0 0 75%;
            max-width: 75%;
          }

          .col-10 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 83.333333%;
            flex: 0 0 83.333333%;
            max-width: 83.333333%;
          }

          .col-11 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 91.666667%;
            flex: 0 0 91.666667%;
            max-width: 91.666667%;
          }

          .col-12 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 100%;
            flex: 0 0 100%;
            max-width: 100%;
          }

          .order-first {
            -webkit-box-ordinal-group: 0;
            -ms-flex-order: -1;
            order: -1;
          }

          .order-last {
            -webkit-box-ordinal-group: 14;
            -ms-flex-order: 13;
            order: 13;
          }

          .order-0 {
            -webkit-box-ordinal-group: 1;
            -ms-flex-order: 0;
            order: 0;
          }

          .order-1 {
            -webkit-box-ordinal-group: 2;
            -ms-flex-order: 1;
            order: 1;
          }

          .order-2 {
            -webkit-box-ordinal-group: 3;
            -ms-flex-order: 2;
            order: 2;
          }

          .order-3 {
            -webkit-box-ordinal-group: 4;
            -ms-flex-order: 3;
            order: 3;
          }

          .order-4 {
            -webkit-box-ordinal-group: 5;
            -ms-flex-order: 4;
            order: 4;
          }

          .order-5 {
            -webkit-box-ordinal-group: 6;
            -ms-flex-order: 5;
            order: 5;
          }

          .order-6 {
            -webkit-box-ordinal-group: 7;
            -ms-flex-order: 6;
            order: 6;
          }

          .order-7 {
            -webkit-box-ordinal-group: 8;
            -ms-flex-order: 7;
            order: 7;
          }

          .order-8 {
            -webkit-box-ordinal-group: 9;
            -ms-flex-order: 8;
            order: 8;
          }

          .order-9 {
            -webkit-box-ordinal-group: 10;
            -ms-flex-order: 9;
            order: 9;
          }

          .order-10 {
            -webkit-box-ordinal-group: 11;
            -ms-flex-order: 10;
            order: 10;
          }

          .order-11 {
            -webkit-box-ordinal-group: 12;
            -ms-flex-order: 11;
            order: 11;
          }

          .order-12 {
            -webkit-box-ordinal-group: 13;
            -ms-flex-order: 12;
            order: 12;
          }

          .offset-1 {
            margin-left: 8.333333%;
          }

          .offset-2 {
            margin-left: 16.666667%;
          }

          .offset-3 {
            margin-left: 25%;
          }

          .offset-4 {
            margin-left: 33.333333%;
          }

          .offset-5 {
            margin-left: 41.666667%;
          }

          .offset-6 {
            margin-left: 50%;
          }

          .offset-7 {
            margin-left: 58.333333%;
          }

          .offset-8 {
            margin-left: 66.666667%;
          }

          .offset-9 {
            margin-left: 75%;
          }

          .offset-10 {
            margin-left: 83.333333%;
          }

          .offset-11 {
            margin-left: 91.666667%;
          }

          @media (min-width: 576px) {
            .col-sm {
              -ms-flex-preferred-size: 0;
              flex-basis: 0;
              -webkit-box-flex: 1;
              -ms-flex-positive: 1;
              flex-grow: 1;
              max-width: 100%;
            }
            .col-sm-auto {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 auto;
              flex: 0 0 auto;
              width: auto;
              max-width: none;
            }
            .col-sm-1 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 8.333333%;
              flex: 0 0 8.333333%;
              max-width: 8.333333%;
            }
            .col-sm-2 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 16.666667%;
              flex: 0 0 16.666667%;
              max-width: 16.666667%;
            }
            .col-sm-3 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 25%;
              flex: 0 0 25%;
              max-width: 25%;
            }
            .col-sm-4 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 33.333333%;
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
            }
            .col-sm-5 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 41.666667%;
              flex: 0 0 41.666667%;
              max-width: 41.666667%;
            }
            .col-sm-6 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-sm-7 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 58.333333%;
              flex: 0 0 58.333333%;
              max-width: 58.333333%;
            }
            .col-sm-8 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 66.666667%;
              flex: 0 0 66.666667%;
              max-width: 66.666667%;
            }
            .col-sm-9 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 75%;
              flex: 0 0 75%;
              max-width: 75%;
            }
            .col-sm-10 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 83.333333%;
              flex: 0 0 83.333333%;
              max-width: 83.333333%;
            }
            .col-sm-11 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 91.666667%;
              flex: 0 0 91.666667%;
              max-width: 91.666667%;
            }
            .col-sm-12 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 100%;
              flex: 0 0 100%;
              max-width: 100%;
            }
            .order-sm-first {
              -webkit-box-ordinal-group: 0;
              -ms-flex-order: -1;
              order: -1;
            }
            .order-sm-last {
              -webkit-box-ordinal-group: 14;
              -ms-flex-order: 13;
              order: 13;
            }
            .order-sm-0 {
              -webkit-box-ordinal-group: 1;
              -ms-flex-order: 0;
              order: 0;
            }
            .order-sm-1 {
              -webkit-box-ordinal-group: 2;
              -ms-flex-order: 1;
              order: 1;
            }
            .order-sm-2 {
              -webkit-box-ordinal-group: 3;
              -ms-flex-order: 2;
              order: 2;
            }
            .order-sm-3 {
              -webkit-box-ordinal-group: 4;
              -ms-flex-order: 3;
              order: 3;
            }
            .order-sm-4 {
              -webkit-box-ordinal-group: 5;
              -ms-flex-order: 4;
              order: 4;
            }
            .order-sm-5 {
              -webkit-box-ordinal-group: 6;
              -ms-flex-order: 5;
              order: 5;
            }
            .order-sm-6 {
              -webkit-box-ordinal-group: 7;
              -ms-flex-order: 6;
              order: 6;
            }
            .order-sm-7 {
              -webkit-box-ordinal-group: 8;
              -ms-flex-order: 7;
              order: 7;
            }
            .order-sm-8 {
              -webkit-box-ordinal-group: 9;
              -ms-flex-order: 8;
              order: 8;
            }
            .order-sm-9 {
              -webkit-box-ordinal-group: 10;
              -ms-flex-order: 9;
              order: 9;
            }
            .order-sm-10 {
              -webkit-box-ordinal-group: 11;
              -ms-flex-order: 10;
              order: 10;
            }
            .order-sm-11 {
              -webkit-box-ordinal-group: 12;
              -ms-flex-order: 11;
              order: 11;
            }
            .order-sm-12 {
              -webkit-box-ordinal-group: 13;
              -ms-flex-order: 12;
              order: 12;
            }
            .offset-sm-0 {
              margin-left: 0;
            }
            .offset-sm-1 {
              margin-left: 8.333333%;
            }
            .offset-sm-2 {
              margin-left: 16.666667%;
            }
            .offset-sm-3 {
              margin-left: 25%;
            }
            .offset-sm-4 {
              margin-left: 33.333333%;
            }
            .offset-sm-5 {
              margin-left: 41.666667%;
            }
            .offset-sm-6 {
              margin-left: 50%;
            }
            .offset-sm-7 {
              margin-left: 58.333333%;
            }
            .offset-sm-8 {
              margin-left: 66.666667%;
            }
            .offset-sm-9 {
              margin-left: 75%;
            }
            .offset-sm-10 {
              margin-left: 83.333333%;
            }
            .offset-sm-11 {
              margin-left: 91.666667%;
            }
          }

          @media (min-width: 768px) {
            .col-md-push-4 {
              left: 66.666666%;
            }
            .col-md-pull-4 {
              right: 33.333333%;
            }
            .col-md {
              -ms-flex-preferred-size: 0;
              flex-basis: 0;
              -webkit-box-flex: 1;
              -ms-flex-positive: 1;
              flex-grow: 1;
              max-width: 100%;
            }
            .col-md-auto {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 auto;
              flex: 0 0 auto;
              width: auto;
              max-width: none;
            }
            .col-md-1 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 8.333333%;
              flex: 0 0 8.333333%;
              max-width: 8.333333%;
            }
            .col-md-2 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 16.666667%;
              flex: 0 0 16.666667%;
              max-width: 16.666667%;
            }
            .col-md-3 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 25%;
              flex: 0 0 25%;
              max-width: 25%;
            }
            .col-md-4 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 33.333333%;
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
            }
            .col-md-5 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 41.666667%;
              flex: 0 0 41.666667%;
              max-width: 41.666667%;
            }
            .col-md-6 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-md-7 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 58.333333%;
              flex: 0 0 58.333333%;
              max-width: 58.333333%;
            }
            .col-md-8 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 66.666667%;
              flex: 0 0 66.666667%;
              max-width: 66.666667%;
            }
            .col-md-9 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 75%;
              flex: 0 0 75%;
              max-width: 75%;
            }
            .col-md-10 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 83.333333%;
              flex: 0 0 83.333333%;
              max-width: 83.333333%;
            }
            .col-md-11 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 91.666667%;
              flex: 0 0 91.666667%;
              max-width: 91.666667%;
            }
            .col-md-12 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 100%;
              flex: 0 0 100%;
              max-width: 100%;
            }
            .order-md-first {
              -webkit-box-ordinal-group: 0;
              -ms-flex-order: -1;
              order: -1;
            }
            .order-md-last {
              -webkit-box-ordinal-group: 14;
              -ms-flex-order: 13;
              order: 13;
            }
            .order-md-0 {
              -webkit-box-ordinal-group: 1;
              -ms-flex-order: 0;
              order: 0;
            }
            .order-md-1 {
              -webkit-box-ordinal-group: 2;
              -ms-flex-order: 1;
              order: 1;
            }
            .order-md-2 {
              -webkit-box-ordinal-group: 3;
              -ms-flex-order: 2;
              order: 2;
            }
            .order-md-3 {
              -webkit-box-ordinal-group: 4;
              -ms-flex-order: 3;
              order: 3;
            }
            .order-md-4 {
              -webkit-box-ordinal-group: 5;
              -ms-flex-order: 4;
              order: 4;
            }
            .order-md-5 {
              -webkit-box-ordinal-group: 6;
              -ms-flex-order: 5;
              order: 5;
            }
            .order-md-6 {
              -webkit-box-ordinal-group: 7;
              -ms-flex-order: 6;
              order: 6;
            }
            .order-md-7 {
              -webkit-box-ordinal-group: 8;
              -ms-flex-order: 7;
              order: 7;
            }
            .order-md-8 {
              -webkit-box-ordinal-group: 9;
              -ms-flex-order: 8;
              order: 8;
            }
            .order-md-9 {
              -webkit-box-ordinal-group: 10;
              -ms-flex-order: 9;
              order: 9;
            }
            .order-md-10 {
              -webkit-box-ordinal-group: 11;
              -ms-flex-order: 10;
              order: 10;
            }
            .order-md-11 {
              -webkit-box-ordinal-group: 12;
              -ms-flex-order: 11;
              order: 11;
            }
            .order-md-12 {
              -webkit-box-ordinal-group: 13;
              -ms-flex-order: 12;
              order: 12;
            }
            .offset-md-0 {
              margin-left: 0;
            }
            .offset-md-1 {
              margin-left: 8.333333%;
            }
            .offset-md-2 {
              margin-left: 16.666667%;
            }
            .offset-md-3 {
              margin-left: 25%;
            }
            .offset-md-4 {
              margin-left: 33.333333%;
            }
            .offset-md-5 {
              margin-left: 41.666667%;
            }
            .offset-md-6 {
              margin-left: 50%;
            }
            .offset-md-7 {
              margin-left: 58.333333%;
            }
            .offset-md-8 {
              margin-left: 66.666667%;
            }
            .offset-md-9 {
              margin-left: 75%;
            }
            .offset-md-10 {
              margin-left: 83.333333%;
            }
            .offset-md-11 {
              margin-left: 91.666667%;
            }
          }

          @media (min-width: 992px) {
            .col-lg {
              -ms-flex-preferred-size: 0;
              flex-basis: 0;
              -webkit-box-flex: 1;
              -ms-flex-positive: 1;
              flex-grow: 1;
              max-width: 100%;
            }
            .col-lg-auto {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 auto;
              flex: 0 0 auto;
              width: auto;
              max-width: none;
            }
            .col-lg-1 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 8.333333%;
              flex: 0 0 8.333333%;
              max-width: 8.333333%;
            }
            .col-lg-2 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 16.666667%;
              flex: 0 0 16.666667%;
              max-width: 16.666667%;
            }
            .col-lg-3 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 25%;
              flex: 0 0 25%;
              max-width: 25%;
            }
            .col-lg-4 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 33.333333%;
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
            }
            .col-lg-5 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 41.666667%;
              flex: 0 0 41.666667%;
              max-width: 41.666667%;
            }
            .col-lg-6 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-lg-7 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 58.333333%;
              flex: 0 0 58.333333%;
              max-width: 58.333333%;
            }
            .col-lg-8 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 66.666667%;
              flex: 0 0 66.666667%;
              max-width: 66.666667%;
            }
            .col-lg-9 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 75%;
              flex: 0 0 75%;
              max-width: 75%;
            }
            .col-lg-10 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 83.333333%;
              flex: 0 0 83.333333%;
              max-width: 83.333333%;
            }
            .col-lg-11 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 91.666667%;
              flex: 0 0 91.666667%;
              max-width: 91.666667%;
            }
            .col-lg-12 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 100%;
              flex: 0 0 100%;
              max-width: 100%;
            }
            .order-lg-first {
              -webkit-box-ordinal-group: 0;
              -ms-flex-order: -1;
              order: -1;
            }
            .order-lg-last {
              -webkit-box-ordinal-group: 14;
              -ms-flex-order: 13;
              order: 13;
            }
            .order-lg-0 {
              -webkit-box-ordinal-group: 1;
              -ms-flex-order: 0;
              order: 0;
            }
            .order-lg-1 {
              -webkit-box-ordinal-group: 2;
              -ms-flex-order: 1;
              order: 1;
            }
            .order-lg-2 {
              -webkit-box-ordinal-group: 3;
              -ms-flex-order: 2;
              order: 2;
            }
            .order-lg-3 {
              -webkit-box-ordinal-group: 4;
              -ms-flex-order: 3;
              order: 3;
            }
            .order-lg-4 {
              -webkit-box-ordinal-group: 5;
              -ms-flex-order: 4;
              order: 4;
            }
            .order-lg-5 {
              -webkit-box-ordinal-group: 6;
              -ms-flex-order: 5;
              order: 5;
            }
            .order-lg-6 {
              -webkit-box-ordinal-group: 7;
              -ms-flex-order: 6;
              order: 6;
            }
            .order-lg-7 {
              -webkit-box-ordinal-group: 8;
              -ms-flex-order: 7;
              order: 7;
            }
            .order-lg-8 {
              -webkit-box-ordinal-group: 9;
              -ms-flex-order: 8;
              order: 8;
            }
            .order-lg-9 {
              -webkit-box-ordinal-group: 10;
              -ms-flex-order: 9;
              order: 9;
            }
            .order-lg-10 {
              -webkit-box-ordinal-group: 11;
              -ms-flex-order: 10;
              order: 10;
            }
            .order-lg-11 {
              -webkit-box-ordinal-group: 12;
              -ms-flex-order: 11;
              order: 11;
            }
            .order-lg-12 {
              -webkit-box-ordinal-group: 13;
              -ms-flex-order: 12;
              order: 12;
            }
            .offset-lg-0 {
              margin-left: 0;
            }
            .offset-lg-1 {
              margin-left: 8.333333%;
            }
            .offset-lg-2 {
              margin-left: 16.666667%;
            }
            .offset-lg-3 {
              margin-left: 25%;
            }
            .offset-lg-4 {
              margin-left: 33.333333%;
            }
            .offset-lg-5 {
              margin-left: 41.666667%;
            }
            .offset-lg-6 {
              margin-left: 50%;
            }
            .offset-lg-7 {
              margin-left: 58.333333%;
            }
            .offset-lg-8 {
              margin-left: 66.666667%;
            }
            .offset-lg-9 {
              margin-left: 75%;
            }
            .offset-lg-10 {
              margin-left: 83.333333%;
            }
            .offset-lg-11 {
              margin-left: 91.666667%;
            }
          }

          @media (min-width: 1200px) {
            .col-xl {
              -ms-flex-preferred-size: 0;
              flex-basis: 0;
              -webkit-box-flex: 1;
              -ms-flex-positive: 1;
              flex-grow: 1;
              max-width: 100%;
            }
            .col-xl-auto {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 auto;
              flex: 0 0 auto;
              width: auto;
              max-width: none;
            }
            .col-xl-1 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 8.333333%;
              flex: 0 0 8.333333%;
              max-width: 8.333333%;
            }
            .col-xl-2 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 16.666667%;
              flex: 0 0 16.666667%;
              max-width: 16.666667%;
            }
            .col-xl-3 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 25%;
              flex: 0 0 25%;
              max-width: 25%;
            }
            .col-xl-4 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 33.333333%;
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
            }
            .col-xl-5 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 41.666667%;
              flex: 0 0 41.666667%;
              max-width: 41.666667%;
            }
            .col-xl-6 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-xl-7 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 58.333333%;
              flex: 0 0 58.333333%;
              max-width: 58.333333%;
            }
            .col-xl-8 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 66.666667%;
              flex: 0 0 66.666667%;
              max-width: 66.666667%;
            }
            .col-xl-9 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 75%;
              flex: 0 0 75%;
              max-width: 75%;
            }
            .col-xl-10 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 83.333333%;
              flex: 0 0 83.333333%;
              max-width: 83.333333%;
            }
            .col-xl-11 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 91.666667%;
              flex: 0 0 91.666667%;
              max-width: 91.666667%;
            }
            .col-xl-12 {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 100%;
              flex: 0 0 100%;
              max-width: 100%;
            }
            .order-xl-first {
              -webkit-box-ordinal-group: 0;
              -ms-flex-order: -1;
              order: -1;
            }
            .order-xl-last {
              -webkit-box-ordinal-group: 14;
              -ms-flex-order: 13;
              order: 13;
            }
            .order-xl-0 {
              -webkit-box-ordinal-group: 1;
              -ms-flex-order: 0;
              order: 0;
            }
            .order-xl-1 {
              -webkit-box-ordinal-group: 2;
              -ms-flex-order: 1;
              order: 1;
            }
            .order-xl-2 {
              -webkit-box-ordinal-group: 3;
              -ms-flex-order: 2;
              order: 2;
            }
            .order-xl-3 {
              -webkit-box-ordinal-group: 4;
              -ms-flex-order: 3;
              order: 3;
            }
            .order-xl-4 {
              -webkit-box-ordinal-group: 5;
              -ms-flex-order: 4;
              order: 4;
            }
            .order-xl-5 {
              -webkit-box-ordinal-group: 6;
              -ms-flex-order: 5;
              order: 5;
            }
            .order-xl-6 {
              -webkit-box-ordinal-group: 7;
              -ms-flex-order: 6;
              order: 6;
            }
            .order-xl-7 {
              -webkit-box-ordinal-group: 8;
              -ms-flex-order: 7;
              order: 7;
            }
            .order-xl-8 {
              -webkit-box-ordinal-group: 9;
              -ms-flex-order: 8;
              order: 8;
            }
            .order-xl-9 {
              -webkit-box-ordinal-group: 10;
              -ms-flex-order: 9;
              order: 9;
            }
            .order-xl-10 {
              -webkit-box-ordinal-group: 11;
              -ms-flex-order: 10;
              order: 10;
            }
            .order-xl-11 {
              -webkit-box-ordinal-group: 12;
              -ms-flex-order: 11;
              order: 11;
            }
            .order-xl-12 {
              -webkit-box-ordinal-group: 13;
              -ms-flex-order: 12;
              order: 12;
            }
            .offset-xl-0 {
              margin-left: 0;
            }
            .offset-xl-1 {
              margin-left: 8.333333%;
            }
            .offset-xl-2 {
              margin-left: 16.666667%;
            }
            .offset-xl-3 {
              margin-left: 25%;
            }
            .offset-xl-4 {
              margin-left: 33.333333%;
            }
            .offset-xl-5 {
              margin-left: 41.666667%;
            }
            .offset-xl-6 {
              margin-left: 50%;
            }
            .offset-xl-7 {
              margin-left: 58.333333%;
            }
            .offset-xl-8 {
              margin-left: 66.666667%;
            }
            .offset-xl-9 {
              margin-left: 75%;
            }
            .offset-xl-10 {
              margin-left: 83.333333%;
            }
            .offset-xl-11 {
              margin-left: 91.666667%;
            }
          }

          .d-none {
            display: none !important;
          }

          .d-inline {
            display: inline !important;
          }

          .d-inline-block {
            display: inline-block !important;
          }

          .d-block {
            display: block !important;
          }

          .d-table {
            display: table !important;
          }

          .d-table-row {
            display: table-row !important;
          }

          .d-table-cell {
            display: table-cell !important;
          }

          .d-flex {
            display: -webkit-box !important;
            display: -ms-flexbox !important;
            display: flex !important;
          }

          .d-inline-flex {
            display: -webkit-inline-box !important;
            display: -ms-inline-flexbox !important;
            display: inline-flex !important;
          }

          @media (min-width: 576px) {
            .d-sm-none {
              display: none !important;
            }
            .d-sm-inline {
              display: inline !important;
            }
            .d-sm-inline-block {
              display: inline-block !important;
            }
            .d-sm-block {
              display: block !important;
            }
            .d-sm-table {
              display: table !important;
            }
            .d-sm-table-row {
              display: table-row !important;
            }
            .d-sm-table-cell {
              display: table-cell !important;
            }
            .d-sm-flex {
              display: -webkit-box !important;
              display: -ms-flexbox !important;
              display: flex !important;
            }
            .d-sm-inline-flex {
              display: -webkit-inline-box !important;
              display: -ms-inline-flexbox !important;
              display: inline-flex !important;
            }
          }

          @media (min-width: 768px) {
            .d-md-none {
              display: none !important;
            }
            .d-md-inline {
              display: inline !important;
            }
            .d-md-inline-block {
              display: inline-block !important;
            }
            .d-md-block {
              display: block !important;
            }
            .d-md-table {
              display: table !important;
            }
            .d-md-table-row {
              display: table-row !important;
            }
            .d-md-table-cell {
              display: table-cell !important;
            }
            .d-md-flex {
              display: -webkit-box !important;
              display: -ms-flexbox !important;
              display: flex !important;
            }
            .d-md-inline-flex {
              display: -webkit-inline-box !important;
              display: -ms-inline-flexbox !important;
              display: inline-flex !important;
            }
          }

          @media (min-width: 992px) {
            .d-lg-none {
              display: none !important;
            }
            .d-lg-inline {
              display: inline !important;
            }
            .d-lg-inline-block {
              display: inline-block !important;
            }
            .d-lg-block {
              display: block !important;
            }
            .d-lg-table {
              display: table !important;
            }
            .d-lg-table-row {
              display: table-row !important;
            }
            .d-lg-table-cell {
              display: table-cell !important;
            }
            .d-lg-flex {
              display: -webkit-box !important;
              display: -ms-flexbox !important;
              display: flex !important;
            }
            .d-lg-inline-flex {
              display: -webkit-inline-box !important;
              display: -ms-inline-flexbox !important;
              display: inline-flex !important;
            }
          }

          @media (min-width: 1200px) {
            .d-xl-none {
              display: none !important;
            }
            .d-xl-inline {
              display: inline !important;
            }
            .d-xl-inline-block {
              display: inline-block !important;
            }
            .d-xl-block {
              display: block !important;
            }
            .d-xl-table {
              display: table !important;
            }
            .d-xl-table-row {
              display: table-row !important;
            }
            .d-xl-table-cell {
              display: table-cell !important;
            }
            .d-xl-flex {
              display: -webkit-box !important;
              display: -ms-flexbox !important;
              display: flex !important;
            }
            .d-xl-inline-flex {
              display: -webkit-inline-box !important;
              display: -ms-inline-flexbox !important;
              display: inline-flex !important;
            }
          }

          @media print {
            .d-print-none {
              display: none !important;
            }
            .d-print-inline {
              display: inline !important;
            }
            .d-print-inline-block {
              display: inline-block !important;
            }
            .d-print-block {
              display: block !important;
            }
            .d-print-table {
              display: table !important;
            }
            .d-print-table-row {
              display: table-row !important;
            }
            .d-print-table-cell {
              display: table-cell !important;
            }
            .d-print-flex {
              display: -webkit-box !important;
              display: -ms-flexbox !important;
              display: flex !important;
            }
            .d-print-inline-flex {
              display: -webkit-inline-box !important;
              display: -ms-inline-flexbox !important;
              display: inline-flex !important;
            }
          }

          .flex-row {
            -webkit-box-orient: horizontal !important;
            -webkit-box-direction: normal !important;
            -ms-flex-direction: row !important;
            flex-direction: row !important;
          }

          .flex-column {
            -webkit-box-orient: vertical !important;
            -webkit-box-direction: normal !important;
            -ms-flex-direction: column !important;
            flex-direction: column !important;
          }

          .flex-row-reverse {
            -webkit-box-orient: horizontal !important;
            -webkit-box-direction: reverse !important;
            -ms-flex-direction: row-reverse !important;
            flex-direction: row-reverse !important;
          }

          .flex-column-reverse {
            -webkit-box-orient: vertical !important;
            -webkit-box-direction: reverse !important;
            -ms-flex-direction: column-reverse !important;
            flex-direction: column-reverse !important;
          }

          .flex-wrap {
            -ms-flex-wrap: wrap !important;
            flex-wrap: wrap !important;
          }

          .flex-nowrap {
            -ms-flex-wrap: nowrap !important;
            flex-wrap: nowrap !important;
          }

          .flex-wrap-reverse {
            -ms-flex-wrap: wrap-reverse !important;
            flex-wrap: wrap-reverse !important;
          }

          .justify-content-start {
            -webkit-box-pack: start !important;
            -ms-flex-pack: start !important;
            justify-content: flex-start !important;
          }

          .justify-content-end {
            -webkit-box-pack: end !important;
            -ms-flex-pack: end !important;
            justify-content: flex-end !important;
          }

          .justify-content-center {
            -webkit-box-pack: center !important;
            -ms-flex-pack: center !important;
            justify-content: center !important;
          }

          .justify-content-between {
            -webkit-box-pack: justify !important;
            -ms-flex-pack: justify !important;
            justify-content: space-between !important;
          }

          .justify-content-around {
            -ms-flex-pack: distribute !important;
            justify-content: space-around !important;
          }

          .align-items-start {
            -webkit-box-align: start !important;
            -ms-flex-align: start !important;
            align-items: flex-start !important;
          }

          .align-items-end {
            -webkit-box-align: end !important;
            -ms-flex-align: end !important;
            align-items: flex-end !important;
          }

          .align-items-center {
            -webkit-box-align: center !important;
            -ms-flex-align: center !important;
            align-items: center !important;
          }

          .align-items-baseline {
            -webkit-box-align: baseline !important;
            -ms-flex-align: baseline !important;
            align-items: baseline !important;
          }

          .align-items-stretch {
            -webkit-box-align: stretch !important;
            -ms-flex-align: stretch !important;
            align-items: stretch !important;
          }

          .align-content-start {
            -ms-flex-line-pack: start !important;
            align-content: flex-start !important;
          }

          .align-content-end {
            -ms-flex-line-pack: end !important;
            align-content: flex-end !important;
          }

          .align-content-center {
            -ms-flex-line-pack: center !important;
            align-content: center !important;
          }

          .align-content-between {
            -ms-flex-line-pack: justify !important;
            align-content: space-between !important;
          }

          .align-content-around {
            -ms-flex-line-pack: distribute !important;
            align-content: space-around !important;
          }

          .align-content-stretch {
            -ms-flex-line-pack: stretch !important;
            align-content: stretch !important;
          }

          .align-self-auto {
            -ms-flex-item-align: auto !important;
            align-self: auto !important;
          }

          .align-self-start {
            -ms-flex-item-align: start !important;
            align-self: flex-start !important;
          }

          .align-self-end {
            -ms-flex-item-align: end !important;
            align-self: flex-end !important;
          }

          .align-self-center {
            -ms-flex-item-align: center !important;
            align-self: center !important;
          }

          .align-self-baseline {
            -ms-flex-item-align: baseline !important;
            align-self: baseline !important;
          }

          .align-self-stretch {
            -ms-flex-item-align: stretch !important;
            align-self: stretch !important;
          }

          @media (min-width: 576px) {
            .flex-sm-row {
              -webkit-box-orient: horizontal !important;
              -webkit-box-direction: normal !important;
              -ms-flex-direction: row !important;
              flex-direction: row !important;
            }
            .flex-sm-column {
              -webkit-box-orient: vertical !important;
              -webkit-box-direction: normal !important;
              -ms-flex-direction: column !important;
              flex-direction: column !important;
            }
            .flex-sm-row-reverse {
              -webkit-box-orient: horizontal !important;
              -webkit-box-direction: reverse !important;
              -ms-flex-direction: row-reverse !important;
              flex-direction: row-reverse !important;
            }
            .flex-sm-column-reverse {
              -webkit-box-orient: vertical !important;
              -webkit-box-direction: reverse !important;
              -ms-flex-direction: column-reverse !important;
              flex-direction: column-reverse !important;
            }
            .flex-sm-wrap {
              -ms-flex-wrap: wrap !important;
              flex-wrap: wrap !important;
            }
            .flex-sm-nowrap {
              -ms-flex-wrap: nowrap !important;
              flex-wrap: nowrap !important;
            }
            .flex-sm-wrap-reverse {
              -ms-flex-wrap: wrap-reverse !important;
              flex-wrap: wrap-reverse !important;
            }
            .justify-content-sm-start {
              -webkit-box-pack: start !important;
              -ms-flex-pack: start !important;
              justify-content: flex-start !important;
            }
            .justify-content-sm-end {
              -webkit-box-pack: end !important;
              -ms-flex-pack: end !important;
              justify-content: flex-end !important;
            }
            .justify-content-sm-center {
              -webkit-box-pack: center !important;
              -ms-flex-pack: center !important;
              justify-content: center !important;
            }
            .justify-content-sm-between {
              -webkit-box-pack: justify !important;
              -ms-flex-pack: justify !important;
              justify-content: space-between !important;
            }
            .justify-content-sm-around {
              -ms-flex-pack: distribute !important;
              justify-content: space-around !important;
            }
            .align-items-sm-start {
              -webkit-box-align: start !important;
              -ms-flex-align: start !important;
              align-items: flex-start !important;
            }
            .align-items-sm-end {
              -webkit-box-align: end !important;
              -ms-flex-align: end !important;
              align-items: flex-end !important;
            }
            .align-items-sm-center {
              -webkit-box-align: center !important;
              -ms-flex-align: center !important;
              align-items: center !important;
            }
            .align-items-sm-baseline {
              -webkit-box-align: baseline !important;
              -ms-flex-align: baseline !important;
              align-items: baseline !important;
            }
            .align-items-sm-stretch {
              -webkit-box-align: stretch !important;
              -ms-flex-align: stretch !important;
              align-items: stretch !important;
            }
            .align-content-sm-start {
              -ms-flex-line-pack: start !important;
              align-content: flex-start !important;
            }
            .align-content-sm-end {
              -ms-flex-line-pack: end !important;
              align-content: flex-end !important;
            }
            .align-content-sm-center {
              -ms-flex-line-pack: center !important;
              align-content: center !important;
            }
            .align-content-sm-between {
              -ms-flex-line-pack: justify !important;
              align-content: space-between !important;
            }
            .align-content-sm-around {
              -ms-flex-line-pack: distribute !important;
              align-content: space-around !important;
            }
            .align-content-sm-stretch {
              -ms-flex-line-pack: stretch !important;
              align-content: stretch !important;
            }
            .align-self-sm-auto {
              -ms-flex-item-align: auto !important;
              align-self: auto !important;
            }
            .align-self-sm-start {
              -ms-flex-item-align: start !important;
              align-self: flex-start !important;
            }
            .align-self-sm-end {
              -ms-flex-item-align: end !important;
              align-self: flex-end !important;
            }
            .align-self-sm-center {
              -ms-flex-item-align: center !important;
              align-self: center !important;
            }
            .align-self-sm-baseline {
              -ms-flex-item-align: baseline !important;
              align-self: baseline !important;
            }
            .align-self-sm-stretch {
              -ms-flex-item-align: stretch !important;
              align-self: stretch !important;
            }
          }

          @media (min-width: 768px) {
            .flex-md-row {
              -webkit-box-orient: horizontal !important;
              -webkit-box-direction: normal !important;
              -ms-flex-direction: row !important;
              flex-direction: row !important;
            }
            .flex-md-column {
              -webkit-box-orient: vertical !important;
              -webkit-box-direction: normal !important;
              -ms-flex-direction: column !important;
              flex-direction: column !important;
            }
            .flex-md-row-reverse {
              -webkit-box-orient: horizontal !important;
              -webkit-box-direction: reverse !important;
              -ms-flex-direction: row-reverse !important;
              flex-direction: row-reverse !important;
            }
            .flex-md-column-reverse {
              -webkit-box-orient: vertical !important;
              -webkit-box-direction: reverse !important;
              -ms-flex-direction: column-reverse !important;
              flex-direction: column-reverse !important;
            }
            .flex-md-wrap {
              -ms-flex-wrap: wrap !important;
              flex-wrap: wrap !important;
            }
            .flex-md-nowrap {
              -ms-flex-wrap: nowrap !important;
              flex-wrap: nowrap !important;
            }
            .flex-md-wrap-reverse {
              -ms-flex-wrap: wrap-reverse !important;
              flex-wrap: wrap-reverse !important;
            }
            .justify-content-md-start {
              -webkit-box-pack: start !important;
              -ms-flex-pack: start !important;
              justify-content: flex-start !important;
            }
            .justify-content-md-end {
              -webkit-box-pack: end !important;
              -ms-flex-pack: end !important;
              justify-content: flex-end !important;
            }
            .justify-content-md-center {
              -webkit-box-pack: center !important;
              -ms-flex-pack: center !important;
              justify-content: center !important;
            }
            .justify-content-md-between {
              -webkit-box-pack: justify !important;
              -ms-flex-pack: justify !important;
              justify-content: space-between !important;
            }
            .justify-content-md-around {
              -ms-flex-pack: distribute !important;
              justify-content: space-around !important;
            }
            .align-items-md-start {
              -webkit-box-align: start !important;
              -ms-flex-align: start !important;
              align-items: flex-start !important;
            }
            .align-items-md-end {
              -webkit-box-align: end !important;
              -ms-flex-align: end !important;
              align-items: flex-end !important;
            }
            .align-items-md-center {
              -webkit-box-align: center !important;
              -ms-flex-align: center !important;
              align-items: center !important;
            }
            .align-items-md-baseline {
              -webkit-box-align: baseline !important;
              -ms-flex-align: baseline !important;
              align-items: baseline !important;
            }
            .align-items-md-stretch {
              -webkit-box-align: stretch !important;
              -ms-flex-align: stretch !important;
              align-items: stretch !important;
            }
            .align-content-md-start {
              -ms-flex-line-pack: start !important;
              align-content: flex-start !important;
            }
            .align-content-md-end {
              -ms-flex-line-pack: end !important;
              align-content: flex-end !important;
            }
            .align-content-md-center {
              -ms-flex-line-pack: center !important;
              align-content: center !important;
            }
            .align-content-md-between {
              -ms-flex-line-pack: justify !important;
              align-content: space-between !important;
            }
            .align-content-md-around {
              -ms-flex-line-pack: distribute !important;
              align-content: space-around !important;
            }
            .align-content-md-stretch {
              -ms-flex-line-pack: stretch !important;
              align-content: stretch !important;
            }
            .align-self-md-auto {
              -ms-flex-item-align: auto !important;
              align-self: auto !important;
            }
            .align-self-md-start {
              -ms-flex-item-align: start !important;
              align-self: flex-start !important;
            }
            .align-self-md-end {
              -ms-flex-item-align: end !important;
              align-self: flex-end !important;
            }
            .align-self-md-center {
              -ms-flex-item-align: center !important;
              align-self: center !important;
            }
            .align-self-md-baseline {
              -ms-flex-item-align: baseline !important;
              align-self: baseline !important;
            }
            .align-self-md-stretch {
              -ms-flex-item-align: stretch !important;
              align-self: stretch !important;
            }
          }

          @media (min-width: 992px) {
            .flex-lg-row {
              -webkit-box-orient: horizontal !important;
              -webkit-box-direction: normal !important;
              -ms-flex-direction: row !important;
              flex-direction: row !important;
            }
            .flex-lg-column {
              -webkit-box-orient: vertical !important;
              -webkit-box-direction: normal !important;
              -ms-flex-direction: column !important;
              flex-direction: column !important;
            }
            .flex-lg-row-reverse {
              -webkit-box-orient: horizontal !important;
              -webkit-box-direction: reverse !important;
              -ms-flex-direction: row-reverse !important;
              flex-direction: row-reverse !important;
            }
            .flex-lg-column-reverse {
              -webkit-box-orient: vertical !important;
              -webkit-box-direction: reverse !important;
              -ms-flex-direction: column-reverse !important;
              flex-direction: column-reverse !important;
            }
            .flex-lg-wrap {
              -ms-flex-wrap: wrap !important;
              flex-wrap: wrap !important;
            }
            .flex-lg-nowrap {
              -ms-flex-wrap: nowrap !important;
              flex-wrap: nowrap !important;
            }
            .flex-lg-wrap-reverse {
              -ms-flex-wrap: wrap-reverse !important;
              flex-wrap: wrap-reverse !important;
            }
            .justify-content-lg-start {
              -webkit-box-pack: start !important;
              -ms-flex-pack: start !important;
              justify-content: flex-start !important;
            }
            .justify-content-lg-end {
              -webkit-box-pack: end !important;
              -ms-flex-pack: end !important;
              justify-content: flex-end !important;
            }
            .justify-content-lg-center {
              -webkit-box-pack: center !important;
              -ms-flex-pack: center !important;
              justify-content: center !important;
            }
            .justify-content-lg-between {
              -webkit-box-pack: justify !important;
              -ms-flex-pack: justify !important;
              justify-content: space-between !important;
            }
            .justify-content-lg-around {
              -ms-flex-pack: distribute !important;
              justify-content: space-around !important;
            }
            .align-items-lg-start {
              -webkit-box-align: start !important;
              -ms-flex-align: start !important;
              align-items: flex-start !important;
            }
            .align-items-lg-end {
              -webkit-box-align: end !important;
              -ms-flex-align: end !important;
              align-items: flex-end !important;
            }
            .align-items-lg-center {
              -webkit-box-align: center !important;
              -ms-flex-align: center !important;
              align-items: center !important;
            }
            .align-items-lg-baseline {
              -webkit-box-align: baseline !important;
              -ms-flex-align: baseline !important;
              align-items: baseline !important;
            }
            .align-items-lg-stretch {
              -webkit-box-align: stretch !important;
              -ms-flex-align: stretch !important;
              align-items: stretch !important;
            }
            .align-content-lg-start {
              -ms-flex-line-pack: start !important;
              align-content: flex-start !important;
            }
            .align-content-lg-end {
              -ms-flex-line-pack: end !important;
              align-content: flex-end !important;
            }
            .align-content-lg-center {
              -ms-flex-line-pack: center !important;
              align-content: center !important;
            }
            .align-content-lg-between {
              -ms-flex-line-pack: justify !important;
              align-content: space-between !important;
            }
            .align-content-lg-around {
              -ms-flex-line-pack: distribute !important;
              align-content: space-around !important;
            }
            .align-content-lg-stretch {
              -ms-flex-line-pack: stretch !important;
              align-content: stretch !important;
            }
            .align-self-lg-auto {
              -ms-flex-item-align: auto !important;
              align-self: auto !important;
            }
            .align-self-lg-start {
              -ms-flex-item-align: start !important;
              align-self: flex-start !important;
            }
            .align-self-lg-end {
              -ms-flex-item-align: end !important;
              align-self: flex-end !important;
            }
            .align-self-lg-center {
              -ms-flex-item-align: center !important;
              align-self: center !important;
            }
            .align-self-lg-baseline {
              -ms-flex-item-align: baseline !important;
              align-self: baseline !important;
            }
            .align-self-lg-stretch {
              -ms-flex-item-align: stretch !important;
              align-self: stretch !important;
            }
          }

          @media (min-width: 1200px) {
            .flex-xl-row {
              -webkit-box-orient: horizontal !important;
              -webkit-box-direction: normal !important;
              -ms-flex-direction: row !important;
              flex-direction: row !important;
            }
            .flex-xl-column {
              -webkit-box-orient: vertical !important;
              -webkit-box-direction: normal !important;
              -ms-flex-direction: column !important;
              flex-direction: column !important;
            }
            .flex-xl-row-reverse {
              -webkit-box-orient: horizontal !important;
              -webkit-box-direction: reverse !important;
              -ms-flex-direction: row-reverse !important;
              flex-direction: row-reverse !important;
            }
            .flex-xl-column-reverse {
              -webkit-box-orient: vertical !important;
              -webkit-box-direction: reverse !important;
              -ms-flex-direction: column-reverse !important;
              flex-direction: column-reverse !important;
            }
            .flex-xl-wrap {
              -ms-flex-wrap: wrap !important;
              flex-wrap: wrap !important;
            }
            .flex-xl-nowrap {
              -ms-flex-wrap: nowrap !important;
              flex-wrap: nowrap !important;
            }
            .flex-xl-wrap-reverse {
              -ms-flex-wrap: wrap-reverse !important;
              flex-wrap: wrap-reverse !important;
            }
            .justify-content-xl-start {
              -webkit-box-pack: start !important;
              -ms-flex-pack: start !important;
              justify-content: flex-start !important;
            }
            .justify-content-xl-end {
              -webkit-box-pack: end !important;
              -ms-flex-pack: end !important;
              justify-content: flex-end !important;
            }
            .justify-content-xl-center {
              -webkit-box-pack: center !important;
              -ms-flex-pack: center !important;
              justify-content: center !important;
            }
            .justify-content-xl-between {
              -webkit-box-pack: justify !important;
              -ms-flex-pack: justify !important;
              justify-content: space-between !important;
            }
            .justify-content-xl-around {
              -ms-flex-pack: distribute !important;
              justify-content: space-around !important;
            }
            .align-items-xl-start {
              -webkit-box-align: start !important;
              -ms-flex-align: start !important;
              align-items: flex-start !important;
            }
            .align-items-xl-end {
              -webkit-box-align: end !important;
              -ms-flex-align: end !important;
              align-items: flex-end !important;
            }
            .align-items-xl-center {
              -webkit-box-align: center !important;
              -ms-flex-align: center !important;
              align-items: center !important;
            }
            .align-items-xl-baseline {
              -webkit-box-align: baseline !important;
              -ms-flex-align: baseline !important;
              align-items: baseline !important;
            }
            .align-items-xl-stretch {
              -webkit-box-align: stretch !important;
              -ms-flex-align: stretch !important;
              align-items: stretch !important;
            }
            .align-content-xl-start {
              -ms-flex-line-pack: start !important;
              align-content: flex-start !important;
            }
            .align-content-xl-end {
              -ms-flex-line-pack: end !important;
              align-content: flex-end !important;
            }
            .align-content-xl-center {
              -ms-flex-line-pack: center !important;
              align-content: center !important;
            }
            .align-content-xl-between {
              -ms-flex-line-pack: justify !important;
              align-content: space-between !important;
            }
            .align-content-xl-around {
              -ms-flex-line-pack: distribute !important;
              align-content: space-around !important;
            }
            .align-content-xl-stretch {
              -ms-flex-line-pack: stretch !important;
              align-content: stretch !important;
            }
            .align-self-xl-auto {
              -ms-flex-item-align: auto !important;
              align-self: auto !important;
            }
            .align-self-xl-start {
              -ms-flex-item-align: start !important;
              align-self: flex-start !important;
            }
            .align-self-xl-end {
              -ms-flex-item-align: end !important;
              align-self: flex-end !important;
            }
            .align-self-xl-center {
              -ms-flex-item-align: center !important;
              align-self: center !important;
            }
            .align-self-xl-baseline {
              -ms-flex-item-align: baseline !important;
              align-self: baseline !important;
            }
            .align-self-xl-stretch {
              -ms-flex-item-align: stretch !important;
              align-self: stretch !important;
            }
          }

          .col-centered {
            float: none;
            margin: 0 auto;
          }

          //universal placeholder styling

          ::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            color: #999;
            text-overflow: clip;
          }
          ::-moz-placeholder {
            /* Firefox 19+ */
            color: #999;
            text-overflow: clip;
          }
          :-ms-input-placeholder {
            /* IE 10+ */
            color: #999;
            text-overflow: clip;
          }
          :-moz-placeholder {
            /* Firefox 18- */
            color: #999;
            text-overflow: clip;
          }

          .nopadding {
            padding: 0;
          }
          .nomargin {
            margin: 0;
          }
          .nomargin-sides {
            margin-left: 0;
            margin-right: 0;
          }
          .nopadding-sides {
            padding-left: 0;
            padding-right: 0;
          }

          .nodecor {
            text-decoration: none;
            color: inherit;
          }

          .Toastify__toast-container {
            z-index: 9999;
            position: fixed;
            padding: 4px;
            width: 320px;
            box-sizing: border-box;
            color: #fff;
          }
          .Toastify__toast-container--top-left {
            top: 1em;
            left: 1em;
          }
          .Toastify__toast-container--top-center {
            top: 1em;
            left: 50%;
            margin-left: -160px;
          }
          .Toastify__toast-container--top-right {
            top: 1em;
            right: 1em;
          }
          .Toastify__toast-container--bottom-left {
            bottom: 1em;
            left: 1em;
          }
          .Toastify__toast-container--bottom-center {
            bottom: 1em;
            left: 50%;
            margin-left: -160px;
          }
          .Toastify__toast-container--bottom-right {
            bottom: 1em;
            right: 1em;
          }

          @media only screen and (max-width: 480px) {
            .Toastify__toast-container {
              width: 100vw;
              padding: 0;
              left: 0;
              margin: 0;
            }
            .Toastify__toast-container--top-left,
            .Toastify__toast-container--top-center,
            .Toastify__toast-container--top-right {
              top: 0;
            }
            .Toastify__toast-container--bottom-left,
            .Toastify__toast-container--bottom-center,
            .Toastify__toast-container--bottom-right {
              bottom: 0;
            }
            .Toastify__toast-container--rtl {
              right: 0;
              left: initial;
            }
          }

          .Toastify__toast {
            position: relative;
            min-height: 64px;
            box-sizing: border-box;
            margin-bottom: 1rem;
            padding: 8px;
            border-radius: 1px;
            box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1),
              0 2px 15px 0 rgba(0, 0, 0, 0.05);
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            max-height: 800px;
            overflow: hidden;
            font-family: sans-serif;
            cursor: pointer;
            direction: ltr;
          }
          .Toastify__toast--rtl {
            direction: rtl;
          }
          .Toastify__toast--default {
            background: #fff;
            color: #aaa;
          }
          .Toastify__toast--info {
            background: #3498db;
          }
          .Toastify__toast--success {
            background: #07bc0c;
          }
          .Toastify__toast--warning {
            background: #f1c40f;
          }
          .Toastify__toast--error {
            background: #e74c3c;
          }
          .Toastify__toast-body {
            margin: auto 0;
            -ms-flex: 1;
            flex: 1;
          }

          @media only screen and (max-width: 480px) {
            .Toastify__toast {
              margin-bottom: 0;
            }
          }

          .Toastify__close-button {
            color: #fff;
            font-weight: bold;
            font-size: 14px;
            background: transparent;
            outline: none;
            border: none;
            padding: 0;
            cursor: pointer;
            opacity: 0.7;
            transition: 0.3s ease;
            -ms-flex-item-align: start;
            align-self: flex-start;
          }
          .Toastify__close-button--default {
            color: #000;
            opacity: 0.3;
          }
          .Toastify__close-button:hover,
          .Toastify__close-button:focus {
            opacity: 1;
          }

          @keyframes Toastify__trackProgress {
            0% {
              width: 100%;
            }
            100% {
              width: 0;
            }
          }

          .Toastify__progress-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 5px;
            z-index: 9999;
            opacity: 0.7;
            animation: Toastify__trackProgress linear 1;
            background-color: rgba(255, 255, 255, 0.7);
          }
          .Toastify__progress-bar--rtl {
            right: 0;
            left: initial;
          }
          .Toastify__progress-bar--default {
            background: linear-gradient(
              to right,
              #4cd964,
              #5ac8fa,
              #007aff,
              #34aadc,
              #5856d6,
              #ff2d55
            );
          }

          @keyframes Toastify__bounceInRight {
            from,
            60%,
            75%,
            90%,
            to {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            from {
              opacity: 0;
              transform: translate3d(3000px, 0, 0);
            }
            60% {
              opacity: 1;
              transform: translate3d(-25px, 0, 0);
            }
            75% {
              transform: translate3d(10px, 0, 0);
            }
            90% {
              transform: translate3d(-5px, 0, 0);
            }
            to {
              transform: none;
            }
          }

          @keyframes Toastify__bounceOutRight {
            20% {
              opacity: 1;
              transform: translate3d(-20px, 0, 0);
            }
            to {
              opacity: 0;
              transform: translate3d(2000px, 0, 0);
            }
          }

          @keyframes Toastify__bounceInLeft {
            from,
            60%,
            75%,
            90%,
            to {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            0% {
              opacity: 0;
              transform: translate3d(-3000px, 0, 0);
            }
            60% {
              opacity: 1;
              transform: translate3d(25px, 0, 0);
            }
            75% {
              transform: translate3d(-10px, 0, 0);
            }
            90% {
              transform: translate3d(5px, 0, 0);
            }
            to {
              transform: none;
            }
          }

          @keyframes Toastify__bounceOutLeft {
            20% {
              opacity: 1;
              transform: translate3d(20px, 0, 0);
            }
            to {
              opacity: 0;
              transform: translate3d(-2000px, 0, 0);
            }
          }

          @keyframes Toastify__bounceInUp {
            from,
            60%,
            75%,
            90%,
            to {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            from {
              opacity: 0;
              transform: translate3d(0, 3000px, 0);
            }
            60% {
              opacity: 1;
              transform: translate3d(0, -20px, 0);
            }
            75% {
              transform: translate3d(0, 10px, 0);
            }
            90% {
              transform: translate3d(0, -5px, 0);
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__bounceOutUp {
            20% {
              transform: translate3d(0, -10px, 0);
            }
            40%,
            45% {
              opacity: 1;
              transform: translate3d(0, 20px, 0);
            }
            to {
              opacity: 0;
              transform: translate3d(0, -2000px, 0);
            }
          }

          @keyframes Toastify__bounceInDown {
            from,
            60%,
            75%,
            90%,
            to {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            0% {
              opacity: 0;
              transform: translate3d(0, -3000px, 0);
            }
            60% {
              opacity: 1;
              transform: translate3d(0, 25px, 0);
            }
            75% {
              transform: translate3d(0, -10px, 0);
            }
            90% {
              transform: translate3d(0, 5px, 0);
            }
            to {
              transform: none;
            }
          }

          @keyframes Toastify__bounceOutDown {
            20% {
              transform: translate3d(0, 10px, 0);
            }
            40%,
            45% {
              opacity: 1;
              transform: translate3d(0, -20px, 0);
            }
            to {
              opacity: 0;
              transform: translate3d(0, 2000px, 0);
            }
          }

          .Toastify__bounce-enter--top-left,
          .Toastify__bounce-enter--bottom-left {
            animation-name: Toastify__bounceInLeft;
          }

          .Toastify__bounce-enter--top-right,
          .Toastify__bounce-enter--bottom-right {
            animation-name: Toastify__bounceInRight;
          }

          .Toastify__bounce-enter--top-center {
            animation-name: Toastify__bounceInDown;
          }

          .Toastify__bounce-enter--bottom-center {
            animation-name: Toastify__bounceInUp;
          }

          .Toastify__bounce-exit--top-left,
          .Toastify__bounce-exit--bottom-left {
            animation-name: Toastify__bounceOutLeft;
          }

          .Toastify__bounce-exit--top-right,
          .Toastify__bounce-exit--bottom-right {
            animation-name: Toastify__bounceOutRight;
          }

          .Toastify__bounce-exit--top-center {
            animation-name: Toastify__bounceOutUp;
          }

          .Toastify__bounce-exit--bottom-center {
            animation-name: Toastify__bounceOutDown;
          }

          @keyframes Toastify__zoomIn {
            from {
              opacity: 0;
              transform: scale3d(0.3, 0.3, 0.3);
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes Toastify__zoomOut {
            from {
              opacity: 1;
            }
            50% {
              opacity: 0;
              transform: scale3d(0.3, 0.3, 0.3);
            }
            to {
              opacity: 0;
            }
          }

          .Toastify__zoom-enter {
            animation-name: Toastify__zoomIn;
          }

          .Toastify__zoom-exit {
            animation-name: Toastify__zoomOut;
          }

          @keyframes Toastify__flipIn {
            from {
              transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
              animation-timing-function: ease-in;
              opacity: 0;
            }
            40% {
              transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
              animation-timing-function: ease-in;
            }
            60% {
              transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
              opacity: 1;
            }
            80% {
              transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
            }
            to {
              transform: perspective(400px);
            }
          }

          @keyframes Toastify__flipOut {
            from {
              transform: perspective(400px);
            }
            30% {
              transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
              opacity: 1;
            }
            to {
              transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
              opacity: 0;
            }
          }

          .Toastify__flip-enter {
            animation-name: Toastify__flipIn;
          }

          .Toastify__flip-exit {
            animation-name: Toastify__flipOut;
          }

          @keyframes Toastify__slideInRight {
            from {
              transform: translate3d(110%, 0, 0);
              visibility: visible;
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__slideInLeft {
            from {
              transform: translate3d(-110%, 0, 0);
              visibility: visible;
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__slideInUp {
            from {
              transform: translate3d(0, 110%, 0);
              visibility: visible;
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__slideInDown {
            from {
              transform: translate3d(0, -110%, 0);
              visibility: visible;
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__slideOutRight {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              visibility: hidden;
              transform: translate3d(110%, 0, 0);
            }
          }

          @keyframes Toastify__slideOutLeft {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              visibility: hidden;
              transform: translate3d(-110%, 0, 0);
            }
          }

          @keyframes Toastify__slideOutUp {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              visibility: hidden;
              transform: translate3d(0, 110%, 0);
            }
          }

          @keyframes Toastify__slideOutDown {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              visibility: hidden;
              transform: translate3d(0, -110%, 0);
            }
          }

          .Toastify__slide-enter--top-left,
          .Toastify__slide-enter--bottom-left {
            animation-name: Toastify__slideInLeft;
          }

          .Toastify__slide-enter--top-right,
          .Toastify__slide-enter--bottom-right {
            animation-name: Toastify__slideInRight;
          }

          .Toastify__slide-enter--top-center {
            animation-name: Toastify__slideInDown;
          }

          .Toastify__slide-enter--bottom-center {
            animation-name: Toastify__slideInUp;
          }

          .Toastify__slide-exit--top-left,
          .Toastify__slide-exit--bottom-left {
            animation-name: Toastify__slideOutLeft;
          }

          .Toastify__slide-exit--top-right,
          .Toastify__slide-exit--bottom-right {
            animation-name: Toastify__slideOutRight;
          }

          .Toastify__slide-exit--top-center {
            animation-name: Toastify__slideOutUp;
          }

          .Toastify__slide-exit--bottom-center {
            animation-name: Toastify__slideOutDown;
          }

          // geosuggest

          .geosuggest {
            font-family: "Quicksand";
            position: relative;
            width: 100%;
            margin: 0;
            text-align: left;
          }
          .geosuggest__input {
            font-family: "Quicksand";
            width: 100%;
            font-size: 1rem;
            border: none;
            text-align: left;
            // border-right: 0.5px solid #1a287f;
          }
          .geosuggest__suggests {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            max-height: 25em;
            padding: 0;
            margin-top: 0px;
            background: #fff;
            border: 0.5px solid #1a287f;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
            border-top: none;
            overflow-x: hidden;
            overflow-y: auto;
            list-style: none;
            z-index: 5;
            -webkit-transition: max-height 0.2s, border 0.2s;
            transition: max-height 0.2s, border 0.2s;
          }
          .geosuggest__suggests--hidden {
            max-height: 0;
            overflow: hidden;
            border-width: 0;
          }

          /**
           * A geosuggest item
           */
          .geosuggest__item {
            font-family: "Quicksand";
            cursor: pointer;
            border-bottom: 0.5px solid #1a287f;
          }
          .geosuggest__item:hover,
          .geosuggest__item:focus {
            background: #f5f5f5;
          }
          .geosuggest__item--active {
            background: #267dc0;
            color: #fff;
          }
          .geosuggest__item--active:hover,
          .geosuggest__item--active:focus {
            background: #ccc;
          }
          .geosuggest__item__matched-text {
            font-weight: bold;
            color: #1a287f;
          }

          // react Dropdown
          .Dropdown-root {
            position: relative;
          }

          .Dropdown-control {
            font-size: 16px;
            border-left: 0.5px solid #1a287f;
            border-right: 0.5px solid #1a287f;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            position: relative;
            overflow: hidden;
            width: 100%;
            background-color: white;
            box-sizing: border-box;
            color: #333;
            cursor: default;
            outline: none;
            padding: 4px 52px 5px 10px;
            transition: all 200ms ease;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .Dropdown-control:hover {
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
          }

          .Dropdown-arrow {
            border-color: #999 transparent transparent;
            border-style: solid;
            border-width: 5px 3px 0;
            content: " ";
            display: block;
            height: 0;
            margin-top: -ceil(2.5);
            position: absolute;
            right: 10px;
            top: 14px;
            width: 0;
          }

          .is-open .Dropdown-arrow {
            border-color: transparent transparent #999;
            border-width: 0 3px 5px;
          }

          .Dropdown-menu {
            background-color: white;
            border-left: 0.5px solid #1a287f;
            border-right: 0.5px solid #1a287f;
            border-top: none;
            box-sizing: border-box;
            margin-top: 0px;
            max-height: 200px;
            overflow-y: auto;
            position: absolute;
            top: 100%;
            width: 100%;
            z-index: 1000;
            -webkit-overflow-scrolling: touch;
          }

          .Dropdown-menu .Dropdown-group > .Dropdown-title {
            padding: 8px 10px;
            color: rgba(51, 51, 51, 1);
            font-weight: bold;
            text-transform: capitalize;
          }

          .Dropdown-option {
            font-size: 14px;
            box-sizing: border-box;
            color: rgba(51, 51, 51, 0.8);
            cursor: pointer;
            display: block;
            padding: 6px 10px;
            font-family: "Quicksand";
            cursor: pointer;
            border-bottom: 0.5px solid #1a287f;
          }

          .Dropdown-option:last-child {
            border-bottom-right-radius: 2px;
            border-bottom-left-radius: 2px;
          }

          .Dropdown-option:hover {
            background: #f5f5f5;
          }

          .Dropdown-option.is-selected {
            background-color: #f2f9fc;
            color: #1a287f;
          }

          .Dropdown-noresults {
            box-sizing: border-box;
            color: #ccc;
            cursor: default;
            display: block;
            padding: 8px 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default Styles;
