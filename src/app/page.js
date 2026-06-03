'use client'

import { useEffect, useState } from 'react'
import liff from '@line/liff'

export default function RegisterPage() {

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  // 🟢 init LIFF
  useEffect(() => {
    const init = async () => {
         await liff.init({
      liffId: "2010280333-vbyMPZKF"
    })

      if (!liff.isLoggedIn()) {
        liff.login()
        return
      }

      const p = await liff.getProfile()
      console.log("USER ID =", p.userId)   // 👈 ตัวนี้แหละที่คุณต้องการ
      console.log("NAME =", p.displayName)

      setProfile(p)
    }

    init()
  }, [])

  // 🟢 ฟังก์ชันเลือก role
  const selectRole = async (role) => {

    setLoading(true)

    try {
      const res = await fetch('/api/user/bind-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: profile.userId,
          role: role
        })
      })

      const data = await res.json()

      if (data.success) {
        alert('เปลี่ยนบทบาทสำเร็จ 🎉')
      } else {
        alert('เกิดข้อผิดพลาด')
      }

    } catch (err) {
      console.log(err)
      alert('error')
    }

    setLoading(false)
  }

  if (!profile) {
    return <p>กำลังโหลด LINE profile...</p>
  }

  return (
    <div style={{ padding: 20 }}>

      <h2>ยินดีต้อนรับ 👶 Teen Mom Buddy</h2>

      <p>ชื่อ: {profile.displayName}</p>

      <hr />

      <h3>เลือกบทบาทของคุณ</h3>

      <button onClick={() => selectRole('mother')}>
        👩‍🍼 แม่หลังคลอด
      </button>

      <br /><br />

      <button onClick={() => selectRole('family')}>
        👨‍👩‍👧 ครอบครัว/ผู้ดูแล
      </button>

      <br /><br />

      <button onClick={() => selectRole('vhv')}>
        🧑‍⚕️ อสม.
      </button>

      <br /><br />

      <button onClick={() => selectRole('staff')}>
        🏥 บุคลากรสาธารณสุข
      </button>

      <br /><br />

      {loading && <p>กำลังบันทึก...</p>}

    </div>
  )
}