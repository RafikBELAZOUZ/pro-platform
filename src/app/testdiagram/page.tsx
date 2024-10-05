'use client';

import React, { useCallback, useState } from 'react';
import Diagram from "../../components/Diagram/diagram"
import {Panel} from "../../components/Diagram/panel"

export const dynamic = 'no-layout';

function DiagramBuilder() {
  return (
    <div className='flex'>
      <div className='h-[calc(100vh_-_48px)] flex-grow m-0 p-0'>
        <Diagram/>
      </div>

      {/* <div className="hidden basis-[300px] md:block lg:basis-[350px] m-0 p-0">
        <div className='bg-white h-full border-gray-200 border'>
          <Panel/>
        </div>
      </div> */}
    </div>
  );
}

export default DiagramBuilder;

