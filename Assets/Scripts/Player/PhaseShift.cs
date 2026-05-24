using UnityEngine;
using System.Collections;

public class PhaseShift : MonoBehaviour
{
    public GameObject normalWorld;
    public GameObject veilWorld;

    public float cooldown = 5f;

    private bool shifted;
    private bool canShift = true;

    void Update()
    {
        if(Input.GetKeyDown(KeyCode.Q) && canShift)
        {
            Shift();
        }
    }

    void Shift()
    {
        shifted = !shifted;

        normalWorld.SetActive(!shifted);
        veilWorld.SetActive(shifted);

        StartCoroutine(ShiftCooldown());
    }

    IEnumerator ShiftCooldown()
    {
        canShift = false;

        yield return new WaitForSeconds(cooldown);

        canShift = true;
    }
}