import { NextResponse } from 'next/server'

export async function GET(req, res) {
  const url = 'https://swgoh.gg/api/guild-profile/J3J2C7LTTW2gjWO1Z5PFKw';
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://swgoh.gg',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return NextResponse.error();
}
