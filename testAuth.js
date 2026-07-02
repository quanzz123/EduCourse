// testAuth.js
const email = `testuser_${Date.now()}@example.com`;
const password = 'SecurePassword123';

async function runTests() {
  console.log("=== Bắt đầu test luồng đăng ký & đăng nhập ===");

  // 1. Test Đăng ký
  try {
    const registerRes = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Nguyễn',
        lastName: 'Văn Test',
        email,
        password
      })
    });
    const registerData = await registerRes.json();
    console.log("1. Đăng ký mới:", registerRes.status === 201 ? "Thành công (201)" : "Thất bại", registerData);
  } catch (err) {
    console.error("Lỗi đăng ký:", err.message);
  }

  // 2. Test Đăng ký trùng email
  try {
    const duplicateRes = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Nguyễn',
        lastName: 'Văn Trùng',
        email,
        password
      })
    });
    const duplicateData = await duplicateRes.json();
    console.log("2. Đăng ký trùng email:", duplicateRes.status === 400 ? "Bị chặn chính xác (400)" : "Thất bại", duplicateData);
  } catch (err) {
    console.error("Lỗi đăng ký trùng:", err.message);
  }

  // 3. Test Đăng nhập thành công
  try {
    const loginRes = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    console.log("3. Đăng nhập đúng thông tin:", loginRes.status === 200 && loginData.data?.token ? "Thành công (200 + Có Token)" : "Thất bại", loginData);
  } catch (err) {
    console.error("Lỗi đăng nhập:", err.message);
  }

  // 4. Test Đăng nhập sai mật khẩu
  try {
    const badLoginRes = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'WrongPassword' })
    });
    const badLoginData = await badLoginRes.json();
    console.log("4. Đăng nhập sai mật khẩu:", badLoginRes.status === 400 ? "Bị chặn chính xác (400)" : "Thất bại", badLoginData);
  } catch (err) {
    console.error("Lỗi đăng nhập sai pass:", err.message);
  }
}

runTests();
