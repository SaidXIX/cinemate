import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from '@layouts/Layout'
import { Home, Favorite, Watchlist, Help, Trending } from '@views'

const Router = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/help' element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
