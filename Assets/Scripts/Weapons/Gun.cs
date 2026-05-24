using UnityEngine;

public class Gun : MonoBehaviour
{
    public float damage = 25f;
    public float range = 100f;
    public float fireRate = 8f;

    public int maxAmmo = 30;

    private int currentAmmo;
    private float nextFireTime;

    public Camera fpsCamera;

    void Start()
    {
        currentAmmo = maxAmmo;
    }

    void Update()
    {
        if(Input.GetButton("Fire1") && Time.time >= nextFireTime)
        {
            nextFireTime = Time.time + 1f / fireRate;
            Shoot();
        }

        if(Input.GetKeyDown(KeyCode.R))
        {
            Reload();
        }
    }

    void Shoot()
    {
        if(currentAmmo <= 0)
            return;

        currentAmmo--;

        RaycastHit hit;

        if(Physics.Raycast(fpsCamera.transform.position, fpsCamera.transform.forward, out hit, range))
        {
            Enemy enemy = hit.transform.GetComponent<Enemy>();

            if(enemy != null)
            {
                enemy.TakeDamage(damage);
            }
        }
    }

    void Reload()
    {
        currentAmmo = maxAmmo;
    }
}